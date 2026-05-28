# ResumeAI — Intelligent Resume Analyzer

A production-ready AI-powered resume analyzer built with React + Vite (frontend) and Node.js + Express (backend), powered by Claude AI.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Resume Upload** | Drag & drop PDF upload with real-time validation |
| **PDF Parsing** | Accurate text extraction from PDF resumes |
| **ATS Score** | 0–100 ATS compatibility score with 6-dimension breakdown |
| **AI Analysis** | Deep semantic analysis via Claude Sonnet |
| **Skill Gap Analysis** | Missing skills detection with learning resources |
| **Interview Prep** | 15+ tailored behavioral, technical & situational questions |
| **Career Roadmap** | Immediate, short-term, and long-term career recommendations |
| **Salary Estimate** | Market salary range based on experience and skills |
| **PDF Report** | Downloadable comprehensive PDF report |
| **Dark Glassmorphism UI** | Modern, animated UI with Framer Motion |

---

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── routes/
│   │   └── resume.js         # POST /api/resume/analyze
│   ├── utils/
│   │   ├── pdfParser.js      # PDF text extraction
│   │   └── aiAnalyzer.js     # Claude AI integration
│   ├── server.js             # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── components/
    │   │   ├── charts/
    │   │   │   ├── ScoreBreakdown.jsx   # Animated bar chart
    │   │   │   └── SkillsRadar.jsx      # Recharts radar
    │   │   ├── layout/
    │   │   │   └── Navbar.jsx
    │   │   └── ui/
    │   │       └── ATSScoreRing.jsx     # SVG progress ring
    │   ├── pages/
    │   │   ├── LandingPage.jsx         # Hero + features
    │   │   ├── UploadPage.jsx          # Drag & drop + form
    │   │   ├── DashboardPage.jsx       # 5-tab analysis view
    │   │   └── ReportPage.jsx          # Full report + PDF download
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- An Anthropic API key ([get one here](https://console.anthropic.com))

### 1. Clone & Install

```bash
# Backend
cd resume-analyzer/backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** — create `backend/.env`:
```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend** — create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🌐 API Reference

### `POST /api/resume/analyze`

Analyzes a resume PDF with Claude AI.

**Request** (multipart/form-data):
| Field | Type | Required | Description |
|---|---|---|---|
| `resume` | File (PDF) | ✅ | PDF resume file (max 10MB) |
| `jobDescription` | string | ❌ | Target job description for ATS matching |
| `targetRole` | string | ❌ | Target role title |

**Response** (JSON):
```json
{
  "id": "uuid",
  "timestamp": "ISO 8601",
  "fileName": "resume.pdf",
  "candidate": { "name": "...", "email": "...", ... },
  "atsScore": {
    "overall": 87,
    "grade": "A-",
    "breakdown": { "formatting": 90, "keywords": 85, ... }
  },
  "strengths": [...],
  "weaknesses": [...],
  "skills": { "technical": [...], "soft": [...], ... },
  "skillGap": { "missing": [...], "toImprove": [...] },
  "experience": { "totalYears": 5, "roles": [...] },
  "interviewQuestions": { "behavioral": [...], "technical": [...], ... },
  "careerRecommendations": { "immediateActions": [...], ... },
  "keywordsAnalysis": { "present": [...], "missing": [...] },
  "improvementSuggestions": [...],
  "overallAssessment": "string"
}
```

### `GET /api/health`
Health check endpoint.

---

## 🚢 Deployment

### Docker

```bash
# Build and run backend
cd backend
docker build -t resumeai-backend .
docker run -p 3001:3001 --env-file .env resumeai-backend

# Build and serve frontend
cd frontend
npm run build
# Serve the dist/ folder with any static host
```

### Railway / Render (Backend)

1. Connect your GitHub repo
2. Set root directory to `backend`
3. Add env variables: `ANTHROPIC_API_KEY`, `FRONTEND_URL`
4. Deploy

### Vercel / Netlify (Frontend)

1. Connect your GitHub repo
2. Set root to `frontend`, build command `npm run build`, output `dist`
3. Add env variable: `VITE_API_URL=https://your-backend.railway.app`
4. Deploy

### Environment Variables Summary

| Variable | Where | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Backend | Your Anthropic API key |
| `PORT` | Backend | Server port (default: 3001) |
| `FRONTEND_URL` | Backend | Frontend origin for CORS |
| `NODE_ENV` | Backend | `development` or `production` |
| `VITE_API_URL` | Frontend | Backend API base URL |

---

## 🛡️ Security Features

- Helmet.js for HTTP security headers
- Rate limiting: 20 requests per 15 minutes per IP
- File type validation (PDF only)
- File size limit (10MB)
- CORS restricted to frontend origin
- Input sanitization

---

## 🎨 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Recharts, React Dropzone, jsPDF, React Router

**Backend:** Node.js, Express, Multer, pdf-parse, @anthropic-ai/sdk, Helmet, express-rate-limit

**AI:** Claude Sonnet (claude-sonnet-4-20250514)

---

## 📝 License

MIT
