<div align="center">

# 🚀 ResumeAI — Intelligent Resume Analyzer

### AI-powered resume analysis with ATS scoring, skill gap detection, interview prep & career roadmap

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-06b6d4?style=for-the-badge)](https://resume-analyzer-ai-ebon.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/hiteshparmar18/resume-analyzer-ai)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs)
![Groq AI](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render)

</div>

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](./screenshots/Landing%20Page.png)

### 📄 Upload Page
![Upload Page](./screenshots/Upload%20Page.png)

### 📊 ATS Score Dashboard
![ATS Dashboard](./screenshots/ATS%20Dashboard.png)

### 📋 Report Page
![Report Page](./screenshots/Report%20Page.png)

---

## 🎯 Live Demo

🌐 **[https://resume-analyzer-ai-ebon.vercel.app](https://resume-analyzer-ai-ebon.vercel.app)**

> ⚡ Note: Backend is on Render free tier — first request may take 30-50 seconds to wake up. Subsequent requests are fast.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Resume Upload** | Drag & drop PDF upload with real-time validation |
| 🔍 **PDF Parsing** | Accurate text extraction from PDF resumes |
| 🎯 **ATS Score** | 0–100 ATS compatibility score with 6-dimension breakdown |
| 🤖 **AI Analysis** | Deep analysis via Groq AI (Llama 3.3 70B) — 100% Free |
| 📊 **Skill Gap Analysis** | Missing skills detection with learning resources |
| 💬 **Interview Prep** | 15+ tailored behavioral, technical & situational questions |
| 🗺️ **Career Roadmap** | Immediate, short-term, and long-term recommendations |
| 💰 **Salary Estimate** | Market salary range based on experience and skills |
| 📥 **PDF Report** | Downloadable comprehensive PDF report |
| 🎨 **Dark Glassmorphism UI** | Modern animated UI with Framer Motion |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **Vite** | Build Tool |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Recharts** | Data Visualization |
| **React Dropzone** | File Upload |
| **jsPDF + AutoTable** | PDF Report Generation |
| **React Router v6** | Client-side Routing |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js 18+** | Runtime |
| **Express.js** | Web Framework |
| **Multer** | File Upload Handling |
| **pdf-parse** | PDF Text Extraction |
| **Helmet.js** | Security Headers |
| **express-rate-limit** | Rate Limiting |

### AI & Deployment
| Technology | Purpose |
|---|---|
| **Groq API** | AI Provider (Free — 14,400 req/day) |
| **Llama 3.3 70B** | AI Model |
| **Vercel** | Frontend Deployment |
| **Render** | Backend Deployment |

---

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── routes/
│   │   └── resume.js          # POST /api/resume/analyze
│   ├── utils/
│   │   ├── pdfParser.js       # PDF text extraction
│   │   └── aiAnalyzer.js      # Groq AI integration
│   ├── server.js              # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── charts/
    │   │   │   ├── ScoreBreakdown.jsx
    │   │   │   └── SkillsRadar.jsx
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx
    │   │   └── ui/
    │   │       └── ATSScoreRing.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── UploadPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   └── ReportPage.jsx
    │   ├── App.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js 18+
- Free Groq API key → [Get here](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/hiteshparmar18/resume-analyzer-ai.git
cd resume-analyzer-ai
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### 4. Run Both Servers

**Terminal 1 — Backend:**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** 🎉

---

## 🌐 API Reference

### `POST /api/resume/analyze`

| Field | Type | Required | Description |
|---|---|---|---|
| `resume` | File (PDF) | ✅ | PDF resume (max 10MB) |
| `jobDescription` | string | ❌ | Job description for ATS matching |
| `targetRole` | string | ❌ | Target role title |

**Response:**
```json
{
  "id": "uuid",
  "fileName": "resume.pdf",
  "atsScore": { "overall": 80, "grade": "B+", "breakdown": {...} },
  "strengths": [...],
  "weaknesses": [...],
  "skills": { "technical": [...], "soft": [...] },
  "skillGap": { "missing": [...], "toImprove": [...] },
  "interviewQuestions": { "behavioral": [...], "technical": [...] },
  "careerRecommendations": { "immediateActions": [...] },
  "overallAssessment": "..."
}
```

---

## 🚢 Deployment

### Frontend → Vercel
1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Add env: `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy ✅

### Backend → Render
1. New Web Service on [render.com](https://render.com)
2. Root Directory: `backend`
3. Build: `npm install` | Start: `node server.js`
4. Add env variables: `GROQ_API_KEY`, `FRONTEND_URL`, `NODE_ENV=production`
5. Deploy ✅

---

## 🛡️ Security

- ✅ Helmet.js security headers
- ✅ Rate limiting (50 req / 15 min)
- ✅ PDF-only file validation
- ✅ 10MB file size limit
- ✅ CORS protection
- ✅ Environment variables for secrets

---

## 🤝 Contributing

```bash
# Fork the repo
git checkout -b feature/AmazingFeature
git commit -m 'Add AmazingFeature'
git push origin feature/AmazingFeature
# Open a Pull Request
```

---

## 📝 License

MIT License — feel free to use this project for learning and portfolio purposes.

---

<div align="center">

## 👨‍💻 Built by Hitesh Parmar

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/hitesh-parmar-18)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/hiteshparmar18)

---

⭐ **Star this repo if you found it helpful!** ⭐

*Made with ❤️ and a lot of ☕ by Hitesh Parmar*

</div>
