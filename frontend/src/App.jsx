import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import DashboardPage from './pages/DashboardPage'
import ReportPage from './pages/ReportPage'

function App() {
  const [analysisData, setAnalysisData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('resumeAnalysis')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const handleSetAnalysisData = (data) => {
    try {
      sessionStorage.setItem('resumeAnalysis', JSON.stringify(data))
    } catch (e) { console.warn('sessionStorage failed', e) }
    setAnalysisData(data)
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#030507', position: 'relative' }}>
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/upload" element={<UploadPage setAnalysisData={handleSetAnalysisData} />} />
            <Route path="/dashboard" element={analysisData ? <DashboardPage data={analysisData} /> : <Navigate to="/upload" replace />} />
            <Route path="/report" element={analysisData ? <ReportPage data={analysisData} /> : <Navigate to="/upload" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App