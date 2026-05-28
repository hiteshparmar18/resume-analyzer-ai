import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, ArrowLeft, CheckCircle, XCircle, Zap } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import ATSScoreRing from '../components/ui/ATSScoreRing'
import ScoreBreakdown from '../components/charts/ScoreBreakdown'

export default function ReportPage({ data }) {
  if (!data) return null

  const { candidate, atsScore, strengths, weaknesses, skills,
    interviewQuestions, careerRecommendations, overallAssessment, fileName, timestamp } = data

  // Safe atsScore with fallbacks
  const safeATS = {
    overall: atsScore?.overall || 0,
    grade: atsScore?.grade || 'N/A',
    verdict: atsScore?.verdict || '',
    breakdown: atsScore?.breakdown || {
      formatting: 0, keywords: 0, experience: 0,
      education: 0, skills: 0, achievements: 0
    }
  }

  const handleDownload = async () => {
    try {
      const { jsPDF } = await import('jspdf')
      const { default: autoTable } = await import('jspdf-autotable')
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const W = doc.internal.pageSize.getWidth()
      const margin = 20
      let y = margin

      const checkPage = (needed = 20) => {
        if (y + needed > 270) { doc.addPage(); y = margin }
      }

      // Header
      doc.setFillColor(7, 12, 18)
      doc.rect(0, 0, W, 48, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(20)
      doc.setTextColor(255, 255, 255)
      doc.text('RESUMEAI — Analysis Report', margin, 20)
      doc.setFontSize(10)
      doc.setTextColor(148, 163, 184)
      doc.text(`${candidate?.name || 'Candidate'} · ${timestamp ? new Date(timestamp).toLocaleDateString() : ''}`, margin, 30)
      doc.text(`File: ${fileName || 'resume.pdf'}`, margin, 38)
      y = 58

      // ATS Score box
      doc.setFillColor(13, 21, 32)
      doc.roundedRect(margin, y, W - 2 * margin, 30, 3, 3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(28)
      doc.setTextColor(34, 211, 238)
      doc.text(`${safeATS.overall}`, margin + 8, y + 19)
      doc.setFontSize(11)
      doc.setTextColor(167, 139, 250)
      doc.text(`Grade: ${safeATS.grade}`, margin + 32, y + 14)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(148, 163, 184)
      const vLines = doc.splitTextToSize(safeATS.verdict || '', W - margin - 85)
      doc.text(vLines, margin + 75, y + 14)
      y += 40

      // Breakdown table
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Score Breakdown', margin, y); y += 5
      autoTable(doc, {
        startY: y,
        head: [['Category', 'Score', 'Rating']],
        body: Object.entries(safeATS.breakdown).map(([k, v]) => [
          k.charAt(0).toUpperCase() + k.slice(1),
          `${v}/100`,
          v >= 80 ? 'Excellent' : v >= 60 ? 'Good' : v >= 40 ? 'Fair' : 'Needs Work'
        ]),
        theme: 'grid',
        headStyles: { fillColor: [13, 21, 32], textColor: [34, 211, 238], fontStyle: 'bold', fontSize: 9 },
        bodyStyles: { fillColor: [7, 12, 18], textColor: [226, 232, 240], fontSize: 9 },
        alternateRowStyles: { fillColor: [13, 21, 32] },
        margin: { left: margin, right: margin },
      })
      y = doc.lastAutoTable.finalY + 10

      // Assessment
      checkPage(30)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('AI Assessment', margin, y); y += 6
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(148, 163, 184)
      const aLines = doc.splitTextToSize(overallAssessment || '', W - 2 * margin)
      doc.text(aLines, margin, y); y += aLines.length * 5 + 10

      // Strengths
      checkPage(40)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Strengths', margin, y); y += 6
      ;(strengths || []).forEach(s => {
        checkPage(14)
        doc.setFillColor(5, 46, 22)
        doc.roundedRect(margin, y, W - 2 * margin, 12, 2, 2, 'F')
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(52, 211, 153)
        doc.text(`+ ${s.title}`, margin + 3, y + 5)
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(148, 163, 184)
        doc.text(s.description || '', margin + 3, y + 10, { maxWidth: W - 2 * margin - 6 })
        y += 15
      })

      // Weaknesses
      y += 5; checkPage(40)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Areas to Improve', margin, y); y += 6
      ;(weaknesses || []).forEach(w => {
        checkPage(14)
        doc.setFillColor(69, 10, 10)
        doc.roundedRect(margin, y, W - 2 * margin, 12, 2, 2, 'F')
        doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(252, 165, 165)
        doc.text(`- ${w.title} [${w.priority}]`, margin + 3, y + 5)
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(148, 163, 184)
        doc.text(w.description || '', margin + 3, y + 10, { maxWidth: W - 2 * margin - 6 })
        y += 15
      })

      // Skills
      y += 5; checkPage(20)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Technical Skills', margin, y); y += 6
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(34, 211, 238)
      const skLines = doc.splitTextToSize((skills?.technical || []).join(' · '), W - 2 * margin)
      doc.text(skLines, margin, y); y += skLines.length * 5 + 10

      // Interview Questions
      checkPage(40)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Interview Questions', margin, y); y += 5
      const allQ = [
        ...(interviewQuestions?.behavioral || []).map(q => ({ ...q, type: 'Behavioral' })),
        ...(interviewQuestions?.technical || []).map(q => ({ ...q, type: 'Technical' })),
        ...(interviewQuestions?.situational || []).map(q => ({ ...q, type: 'Situational' })),
      ]
      autoTable(doc, {
        startY: y, head: [['Type', 'Question', 'Tip']],
        body: allQ.map(q => [q.type, q.question || '', q.tip || '']),
        theme: 'striped',
        headStyles: { fillColor: [13, 21, 32], textColor: [167, 139, 250], fontSize: 9 },
        bodyStyles: { fillColor: [7, 12, 18], textColor: [226, 232, 240], fontSize: 8 },
        alternateRowStyles: { fillColor: [13, 21, 32] },
        columnStyles: { 0: { cellWidth: 25 }, 2: { cellWidth: 55 } },
        margin: { left: margin, right: margin },
      })
      y = doc.lastAutoTable.finalY + 10

      // Career Roadmap
      checkPage(40)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(255, 255, 255)
      doc.text('Career Roadmap', margin, y); y += 5
      const careerRows = [
        ...(careerRecommendations?.immediateActions || []).map(a => ['Now', a.action, a.timeframe]),
        ...(careerRecommendations?.shortTerm || []).map(a => ['Short-term', a.action, a.timeframe]),
        ...(careerRecommendations?.longTerm || []).map(a => ['Long-term', a.action, a.timeframe]),
      ]
      autoTable(doc, {
        startY: y, head: [['Phase', 'Action', 'Timeframe']],
        body: careerRows, theme: 'grid',
        headStyles: { fillColor: [13, 21, 32], textColor: [52, 211, 153], fontSize: 9 },
        bodyStyles: { fillColor: [7, 12, 18], textColor: [226, 232, 240], fontSize: 8 },
        alternateRowStyles: { fillColor: [13, 21, 32] },
        columnStyles: { 0: { cellWidth: 28 }, 2: { cellWidth: 30 } },
        margin: { left: margin, right: margin },
      })

      const totalPages = doc.internal.getNumberOfPages()
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p)
        doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(71, 85, 105)
        doc.text(`ResumeAI · Page ${p} of ${totalPages} · ${new Date().toLocaleString()}`, margin, 290)
      }

      doc.save(`ResumeAI-${candidate?.name?.replace(/\s+/g, '-') || 'Report'}.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
      alert('PDF generation failed. Please try again.')
    }
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 96, paddingBottom: 64, padding: '96px 24px 64px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#94a3b8', textDecoration: 'none', fontSize: 14 }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <button onClick={handleDownload} className="btn-primary" style={{ fontSize: 14 }}>
              <Download size={15} /> Download PDF Report
            </button>
          </motion.div>

          <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} style={{ overflow: 'hidden' }}>

            {/* Report header */}
            <div style={{ background: 'linear-gradient(135deg, #0D1520, #131E2D)', padding: '36px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={14} color="white" />
                    </div>
                    <span style={{ fontFamily: 'Syne', fontWeight: 700, color: 'white' }}>ResumeAI</span>
                    <span style={{ color: '#475569' }}>·</span>
                    <span style={{ color: '#64748b', fontSize: 13, fontFamily: 'JetBrains Mono' }}>Analysis Report</span>
                  </div>
                  <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 30, color: 'white' }}>
                    {candidate?.name || 'Candidate'}
                  </h1>
                  <p style={{ color: '#94a3b8', marginTop: 4 }}>
                    {candidate?.email}{candidate?.location ? ` · ${candidate.location}` : ''}
                  </p>
                  <p style={{ color: '#475569', fontSize: 12, fontFamily: 'JetBrains Mono', marginTop: 6 }}>
                    {timestamp ? new Date(timestamp).toLocaleString() : ''} · {fileName || ''}
                  </p>
                </div>
                <ATSScoreRing score={safeATS.overall} grade={safeATS.grade} size={140} />
              </div>
            </div>

            <div style={{ padding: '36px' }}>

              {/* Executive Summary */}
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, color: '#22d3ee', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
                  Executive Summary
                </h2>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 20 }}>
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8 }}>{overallAssessment || 'No assessment available.'}</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
                  Score Breakdown
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
                  {Object.entries(safeATS.breakdown).map(([key, val]) => (
                    <div key={key} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, padding: 16 }}>
                      <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 24, color: 'white' }}>
                        {val}<span style={{ color: '#475569', fontSize: 13, fontWeight: 400 }}>/100</span>
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'capitalize', marginTop: 4 }}>{key}</div>
                      <div style={{ marginTop: 8, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${val}%`, background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)', borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <ScoreBreakdown breakdown={safeATS.breakdown} />
              </div>

              {/* Strengths & Weaknesses */}
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, color: '#34d399', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
                  Strengths & Weaknesses
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#34d399', marginBottom: 10 }}>✓ Strengths</p>
                    {(strengths || []).map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)', borderRadius: 10, marginBottom: 8 }}>
                        <CheckCircle size={13} color="#34d399" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <p style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>{s.title}</p>
                          <p style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#f87171', marginBottom: 10 }}>✗ Needs Improvement</p>
                    {(weaknesses || []).map((w, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: 10, marginBottom: 8 }}>
                        <XCircle size={13} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <p style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>{w.title}</p>
                          <p style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>{w.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, color: '#f472b6', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
                  Skills Profile
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  {[
                    { label: 'Technical', items: skills?.technical, color: 'rgba(6,182,212,0.1)', text: '#22d3ee' },
                    { label: 'Tools', items: skills?.tools, color: 'rgba(139,92,246,0.1)', text: '#a78bfa' },
                    { label: 'Soft Skills', items: skills?.soft, color: 'rgba(244,114,182,0.1)', text: '#f472b6' },
                  ].map(({ label, items, color, text }) => (
                    <div key={label}>
                      <p style={{ fontSize: 12, fontFamily: 'Syne', fontWeight: 600, color: '#64748b', marginBottom: 8 }}>{label}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {(items || []).map((s, i) => (
                          <span key={i} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: color, color: text, fontFamily: 'JetBrains Mono' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Roadmap */}
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, color: '#34d399', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
                  Career Roadmap
                </h2>
                {[
                  { phase: 'Immediate', items: careerRecommendations?.immediateActions, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
                  { phase: 'Short-term', items: careerRecommendations?.shortTerm, color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
                  { phase: 'Long-term', items: careerRecommendations?.longTerm, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
                ].map(({ phase, items, color, bg }) => (
                  <div key={phase} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, fontFamily: 'Syne', fontWeight: 600, color, background: bg, flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
                      {phase}
                    </span>
                    <div style={{ flex: 1 }}>
                      {(items || []).map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                          <span style={{ color: '#475569', flexShrink: 0 }}>·</span>
                          <p style={{ color: '#cbd5e1', fontSize: 13 }}>{a.action}</p>
                          <span style={{ color: '#475569', fontSize: 12, marginLeft: 'auto', flexShrink: 0 }}>{a.timeframe}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20, textAlign: 'center' }}>
                <p style={{ color: '#475569', fontSize: 12, fontFamily: 'JetBrains Mono' }}>
                  ResumeAI · Powered by Groq AI · {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}