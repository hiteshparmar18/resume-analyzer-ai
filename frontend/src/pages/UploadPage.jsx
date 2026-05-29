import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, X, Briefcase, ChevronRight, AlertCircle, Loader2, Zap } from 'lucide-react'
import Navbar from '../components/layout/Navbar'

const loadingMessages = [
  'Parsing your resume...', 'Running ATS compatibility check...',
  'Analyzing skills and experience...', 'Generating interview questions...',
  'Crafting career recommendations...', 'Finalizing your report...'
]

export default function UploadPage({ setAnalysisData }) {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)

  const onDrop = useCallback((accepted, rejected) => {
    setError('')
    if (rejected.length > 0) { setError('Please upload a valid PDF file (max 10MB).'); return; }
    if (accepted.length > 0) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, maxSize: 10 * 1024 * 1024, multiple: false
  })

  const handleAnalyze = async () => {
    if (!file) return
    setError(''); setLoading(true)
    let i = 0
    const interval = setInterval(() => { i = (i + 1) % loadingMessages.length; setMsgIndex(i) }, 2000)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobDescription', jobDescription)
      formData.append('targetRole', targetRole)

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const res = await fetch(`${apiUrl}/api/resume/analyze`, { method: 'POST', body: formData })
      const data = await res.json()
      // console.log("API Response:", data)
      if (!res.ok) throw new Error(data.error || 'Analysis failed')

      clearInterval(interval)
      setAnalysisData(data)
      navigate('/dashboard')
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 32px' }}>
            <motion.div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid rgba(6,182,212,0.2)'
            }} animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div style={{
              position: 'absolute', inset: 12, borderRadius: '50%',
              border: '2px solid rgba(139,92,246,0.3)'
            }} animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
            <div style={{
              position: 'absolute', inset: 24, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader2 size={28} color="#22d3ee" />
              </motion.div>
            </div>
          </div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 24, color: 'white', marginBottom: 12 }}>Analyzing Your Resume</h2>
          <AnimatePresence mode="wait">
            <motion.p key={msgIndex} style={{ color: '#94a3b8' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {loadingMessages[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 112, paddingBottom: 64, padding: '112px 24px 64px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 20
            }}>
              <Zap size={14} color="#22d3ee" />
              <span style={{ color: '#22d3ee', fontSize: 14 }}>AI Resume Analysis</span>
            </div>
            <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, color: 'white', marginBottom: 12 }}>Upload Your Resume</h1>
            <p style={{ color: '#94a3b8', maxWidth: 400, margin: '0 auto' }}>
              Drop your PDF resume below and optionally add a job description for targeted analysis.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Dropzone */}
            <div {...getRootProps()} className="glass-card" style={{
              padding: 40, textAlign: 'center', cursor: 'pointer',
              borderColor: isDragActive ? 'rgba(6,182,212,0.5)' : file ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.05)',
              background: isDragActive ? 'rgba(6,182,212,0.05)' : file ? 'rgba(52,211,153,0.03)' : 'rgba(13,21,32,0.6)',
              transition: 'all 0.3s'
            }}>
              <input {...getInputProps()} />
              {file ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={22} color="#34d399" />
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <p style={{ fontFamily: 'Syne', fontWeight: 600, color: 'white', marginBottom: 2 }}>{file.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: 13 }}>{(file.size / 1024).toFixed(1)} KB · PDF</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); setFile(null) }} style={{
                    width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <X size={14} color="#94a3b8" />
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: isDragActive ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isDragActive ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Upload size={28} color={isDragActive ? '#22d3ee' : '#94a3b8'} />
                  </div>
                  <p style={{ fontFamily: 'Syne', fontWeight: 600, fontSize: 17, color: 'white', marginBottom: 8 }}>
                    {isDragActive ? 'Drop it here!' : 'Drop your resume here'}
                  </p>
                  <p style={{ color: '#64748b', fontSize: 14 }}>
                    or <span style={{ color: '#22d3ee' }}>browse files</span> · PDF only · Max 10MB
                  </p>
                </>
              )}
            </div>

            {/* Target Role */}
            <div className="glass-card" style={{ padding: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>
                <Briefcase size={14} color="#22d3ee" /> Target Role
                <span style={{ color: '#475569', fontWeight: 400, marginLeft: 'auto' }}>Optional</span>
              </label>
              <input
                type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer, Product Manager..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: 'white', fontSize: 14, outline: 'none', fontFamily: 'DM Sans', boxSizing: 'border-box' }}
              />
            </div>

            {/* Job Description */}
            <div className="glass-card" style={{ padding: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>
                <FileText size={14} color="#a78bfa" /> Job Description
                <span style={{ color: '#475569', fontWeight: 400, marginLeft: 'auto', fontSize: 12 }}>Optional — improves ATS match</span>
              </label>
              <textarea
                value={jobDescription} onChange={e => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here for targeted keyword matching..."
                rows={5}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: 'white', fontSize: 14, outline: 'none', fontFamily: 'DM Sans', resize: 'none', boxSizing: 'border-box' }}
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '12px 16px' }}>
                  <AlertCircle size={16} color="#f87171" />
                  <p style={{ color: '#fca5a5', fontSize: 14 }}>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyze Button */}
            <AnimatePresence>
              {file && (
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  onClick={handleAnalyze} className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16 }}>
                  <Zap size={18} /> Analyze Resume with AI <ChevronRight size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
