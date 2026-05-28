const https = require("https");

function buildPrompt(resumeText, jobDescription, targetRole) {
  return "You are an expert ATS resume analyzer. Analyze this resume and return ONLY valid JSON, no markdown, no backticks.\n\nTarget Role: " + (targetRole || "Not provided") + "\nJob Description: " + (jobDescription || "Not provided") + "\nResume: " + resumeText + '\n\nReturn this exact JSON structure with real data from the resume:\n{"candidate":{"name":"","email":"","phone":"","location":"","linkedin":null,"github":null,"summary":""},"atsScore":{"overall":75,"grade":"B","verdict":"","breakdown":{"formatting":75,"keywords":70,"experience":75,"education":80,"skills":70,"achievements":65}},"strengths":[{"title":"","description":"","impact":"high"},{"title":"","description":"","impact":"medium"},{"title":"","description":"","impact":"high"}],"weaknesses":[{"title":"","description":"","priority":"high"},{"title":"","description":"","priority":"medium"},{"title":"","description":"","priority":"low"}],"skills":{"technical":[],"soft":[],"tools":[],"languages":[],"certifications":[]},"skillGap":{"missing":[{"skill":"","importance":"high","reason":""}],"toImprove":[{"skill":"","currentLevel":"beginner","targetLevel":"intermediate","resources":[]}]},"experience":{"totalYears":0,"careerProgression":"ascending","progressionNote":"","roles":[{"title":"","company":"","duration":"","highlights":[],"impactScore":7}]},"education":[{"degree":"","field":"","institution":"","year":"","gpa":null}],"keywordsAnalysis":{"present":[],"missing":[],"industryTerms":[]},"interviewQuestions":{"behavioral":[{"question":"","category":"","tip":""},{"question":"","category":"","tip":""},{"question":"","category":"","tip":""}],"technical":[{"question":"","category":"","tip":""},{"question":"","category":"","tip":""},{"question":"","category":"","tip":""}],"situational":[{"question":"","category":"","tip":""},{"question":"","category":"","tip":""},{"question":"","category":"","tip":""}]},"careerRecommendations":{"immediateActions":[{"action":"","timeframe":"1 week","impact":""},{"action":"","timeframe":"2 weeks","impact":""}],"shortTerm":[{"action":"","timeframe":"3 months","impact":""},{"action":"","timeframe":"6 months","impact":""}],"longTerm":[{"action":"","timeframe":"1 year","impact":""},{"action":"","timeframe":"2 years","impact":""}],"alternativeRoles":[],"salaryRange":{"min":50000,"max":80000,"currency":"USD","note":""}},"improvementSuggestions":[{"section":"","current":"","suggested":"","reason":""},{"section":"","current":"","suggested":"","reason":""}],"overallAssessment":""}';
}

function callGroq(apiKey, prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 8192,
      response_format: { type: "json_object" }
    });

    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Content-Length": Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            const text = parsed.choices && parsed.choices[0] && parsed.choices[0].message && parsed.choices[0].message.content;
            if (!text) reject(new Error("Empty response from Groq"));
            else resolve(text);
          }
        } catch (e) {
          reject(new Error("Failed to parse response: " + e.message));
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error("Timeout")); });
    req.write(body);
    req.end();
  });
}

async function analyzeResume(resumeText, jobDescription, targetRole) {
  jobDescription = jobDescription || "";
  targetRole = targetRole || "";

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is missing in .env file");

  console.log("🤖 Calling Groq AI (Llama 3 70B)...");
  const prompt = buildPrompt(resumeText, jobDescription, targetRole);
  const responseText = await callGroq(apiKey, prompt);

  console.log("📥 Groq response received, parsing...");
  const cleaned = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();

  let analysis;
  try {
    analysis = JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON parse failed:", cleaned.substring(0, 200));
    throw new Error("AI returned invalid JSON. Please try again.");
  }

  // FIX: correct property name is atsScore not safeATS
  if (!analysis || !analysis.atsScore || typeof analysis.atsScore.overall !== "number") {
    throw new Error("Invalid analysis structure. Please try again.");
  }

  console.log("✅ Done! ATS Score:", analysis.atsScore.overall);
  return analysis;
}

module.exports = { analyzeResume };