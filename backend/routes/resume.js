const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { parseResume } = require("../utils/pdfParser");
const { analyzeResume } = require("../utils/aiAnalyzer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", (req, res) => {
  res.json({ success: true, message: "Resume API working 🚀" });
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("📥 Resume upload request received");

    if (!req.file) {
      return res.status(400).json({ error: "No PDF resume uploaded" });
    }

    console.log("📄 File:", req.file.originalname);

    const targetRole = req.body.targetRole || "";
    const jobDescription = req.body.jobDescription || "";

    console.log("📄 Parsing PDF...");
    const resumeText = await parseResume(req.file.buffer);

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        error: "Could not extract enough text from PDF. The file may be scanned or corrupted."
      });
    }

    console.log("✅ PDF parsed successfully");
    console.log("🤖 Sending to Gemini AI...");

    const analysis = await analyzeResume(resumeText, jobDescription, targetRole);

    console.log("✅ AI analysis completed");

    // IMPORTANT: return analysis fields at ROOT level so frontend can read them directly
    const result = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      fileName: req.file.originalname,
      fileSize: req.file.size,
      // Spread all analysis fields to root level
      ...analysis
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Resume Analysis Error:", error);
    return res.status(500).json({
      error: error.message || "Resume analysis failed. Please try again."
    });
  }
});

module.exports = router;