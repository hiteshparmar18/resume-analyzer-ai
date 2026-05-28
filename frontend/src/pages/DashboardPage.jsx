import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Target, Brain, TrendingUp, MessageSquare, ArrowUpRight,
  CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp,
  Zap, User, Download, ExternalLink, Clock, BookOpen, Star
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import ATSScoreRing from '../components/ui/ATSScoreRing'
import ScoreBreakdown from '../components/charts/ScoreBreakdown'
import SkillsRadar from '../components/charts/SkillsRadar'

const importanceColors = { critical: '#ef4444', high: '#fb923c', medium: '#facc15' }

function Tag({ children, color = 'rgba(255,255,255,0.1)', textColor = '#cbd5e1' }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', fontWeight: 500, background: color, color: textColor, margin: 2 }}>{children}</span>
}

function Card({ title, icon: Icon, iconColor, children, delay = 0 }) {
  return (
    <motion.div className="glass-card" style={{ padding: 24 }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={iconColor} />
        </div>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: 'white' }}>{title}</h2>
      </div>
      {children}
    </motion.div>
  )
}

function QCard({ q, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#475569', marginTop: 2, flexShrink: 0 }}>Q{index + 1}</span>
        <span style={{ fontSize: 13, color: '#e2e8f0', flex: 1, lineHeight: 1.5 }}>{q.question}</span>
        {open ? <ChevronUp size={14} color="#64748b" /> : <ChevronDown size={14} color="#64748b" />}
      </button>
      {open && (
        <div style={{ padding: '0 14px 14px 38px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: 8, paddingTop: 12 }}>
            <Star size={12} color="#facc15" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{q.tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: Target },
  { id: 'skills', label: 'Skills', icon: Brain },
  { id: 'experience', label: 'Experience', icon: TrendingUp },
  { id: 'interview', label: 'Interview Prep', icon: MessageSquare },
  { id: 'career', label: 'Career Plan', icon: ArrowUpRight },
]

export default function DashboardPage({ data }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  if (!data) return null
  
  const { candidate, atsScore, strengths, weaknesses, skills, skillGap, experience,
    education, interviewQuestions, careerRecommendations, keywordsAnalysis,
    improvementSuggestions, overallAssessment } = data

  if (!atsScore) return null

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: 96, paddingBottom: 64, padding: '96px 16px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: '#475569', fontSize: 12, fontFamily: 'JetBrains Mono', marginBottom: 4 }}>Analysis Complete</p>
              <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, color: 'white' }}>{candidate?.name || 'Resume Analysis'}</h1>
              <p style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{candidate?.email} {candidate?.location ? `· ${candidate.location}` : ''}</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/report" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 14 }}><Download size={15} /> Report</Link>
              <Link to="/upload" className="btn-primary" style={{ textDecoration: 'none', fontSize: 14 }}><Zap size={15} /> New Analysis</Link>
            </div>
          </motion.div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: 4, marginBottom: 24, overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'Syne', fontWeight: 500, whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b'
              }}>
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <Card title="ATS Score" icon={Target} iconColor="#22d3ee">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ATSScoreRing score={atsScore.overall} grade={atsScore.grade} size={180} />
                  <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 12 }}>{atsScore.verdict}</p>
                  <div style={{ width: '100%', marginTop: 20 }}><ScoreBreakdown breakdown={atsScore.breakdown} /></div>
                </div>
              </Card>

              <Card title="Performance Radar" icon={Brain} iconColor="#a78bfa" delay={0.1}>
                <SkillsRadar breakdown={atsScore.breakdown} />
              </Card>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card title="AI Assessment" icon={Brain} iconColor="#a78bfa" delay={0.2}>
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{overallAssessment}</p>
                </Card>
                <Card title="Keywords" icon={CheckCircle} iconColor="#34d399" delay={0.25}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {(keywordsAnalysis?.present || []).slice(0, 12).map(kw => <Tag key={kw} color="rgba(52,211,153,0.1)" textColor="#34d399">{kw}</Tag>)}
                    {(keywordsAnalysis?.missing || []).slice(0, 5).map(kw => <Tag key={kw} color="rgba(239,68,68,0.1)" textColor="#f87171">{kw}</Tag>)}
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: '#475569' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />Present</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />Missing</span>
                  </div>
                </Card>
              </div>

              <Card title="Strengths" icon={CheckCircle} iconColor="#34d399" delay={0.3}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(strengths || []).map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: 12, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)', borderRadius: 12 }}>
                      <CheckCircle size={14} color="#34d399" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div><p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.title}</p>
                        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{s.description}</p></div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Areas to Improve" icon={AlertTriangle} iconColor="#fb923c" delay={0.35}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(weaknesses || []).map((w, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: 12, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: 12 }}>
                      <XCircle size={14} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div><p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{w.title}</p>
                        <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{w.description}</p></div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Quick Fixes" icon={Zap} iconColor="#22d3ee" delay={0.4}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(improvementSuggestions || []).slice(0, 4).map((s, i) => (
                    <div key={i} style={{ padding: 12, background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)', borderRadius: 12 }}>
                      <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#22d3ee', marginBottom: 6 }}>{s.section}</p>
                      <p style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.5 }}>{s.suggested}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <Card title="Technical Skills" icon={Brain} iconColor="#22d3ee">
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{(skills?.technical || []).map(s => <Tag key={s} color="rgba(6,182,212,0.1)" textColor="#22d3ee">{s}</Tag>)}</div>
              </Card>
              <Card title="Tools & Technologies" icon={Brain} iconColor="#a78bfa" delay={0.05}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{(skills?.tools || []).map(s => <Tag key={s} color="rgba(139,92,246,0.1)" textColor="#a78bfa">{s}</Tag>)}</div>
              </Card>
              <Card title="Soft Skills" icon={User} iconColor="#f472b6" delay={0.1}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{(skills?.soft || []).map(s => <Tag key={s} color="rgba(244,114,182,0.1)" textColor="#f472b6">{s}</Tag>)}</div>
              </Card>
              <Card title="Certifications" icon={Star} iconColor="#facc15" delay={0.15}>
                {skills?.certifications?.length > 0
                  ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>{skills.certifications.map(s => <Tag key={s} color="rgba(250,204,21,0.1)" textColor="#facc15">{s}</Tag>)}</div>
                  : <p style={{ color: '#475569', fontSize: 14 }}>No certifications listed</p>}
              </Card>
              <div style={{ gridColumn: '1 / -1' }}>
                <Card title="Skill Gap Analysis" icon={TrendingUp} iconColor="#34d399" delay={0.2}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>Missing Critical Skills</p>
                      {(skillGap?.missing || []).map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: importanceColors[item.importance], flexShrink: 0, marginTop: 5 }} />
                          <div><p style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>{item.skill}</p>
                            <p style={{ color: '#64748b', fontSize: 12 }}>{item.reason}</p></div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>Skills to Level Up</p>
                      {(skillGap?.toImprove || []).map((item, i) => (
                        <div key={i} style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <p style={{ color: 'white', fontSize: 13, fontWeight: 500 }}>{item.skill}</p>
                            <span style={{ fontSize: 11, color: '#64748b' }}><span style={{ color: '#fb923c' }}>{item.currentLevel}</span> → <span style={{ color: '#34d399' }}>{item.targetLevel}</span></span>
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {(item.resources || []).map(r => <span key={r} style={{ fontSize: 11, color: '#64748b', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 100 }}>{r}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <Card title="Work Experience" icon={TrendingUp} iconColor="#34d399">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {(experience?.roles || []).map((role, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        style={{ paddingLeft: 20, borderLeft: '2px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: -6, top: 6, width: 10, height: 10, borderRadius: '50%', background: 'rgba(52,211,153,0.4)', border: '2px solid #34d399' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                          <div>
                            <p style={{ fontFamily: 'Syne', fontWeight: 700, color: 'white', fontSize: 16 }}>{role.title}</p>
                            <p style={{ color: '#94a3b8', fontSize: 14 }}>{role.company} · {role.duration}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ color: '#475569', fontSize: 11 }}>Impact</p>
                            <p style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#34d399', fontSize: 14 }}>{role.impactScore}/10</p>
                          </div>
                        </div>
                        <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {(role.highlights || []).map((h, j) => (
                            <li key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#94a3b8', lineHeight: 1.5, listStyle: 'none' }}>
                              <span style={{ color: '#475569', flexShrink: 0 }}>·</span>{h}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card title="Career Stats" icon={TrendingUp} iconColor="#22d3ee" delay={0.1}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                      <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, color: 'white' }}>{experience?.totalYears || 0}</div>
                      <div style={{ color: '#94a3b8', fontSize: 14 }}>Years of experience</div>
                    </div>
                    <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                      <p style={{ fontSize: 13, fontFamily: 'Syne', fontWeight: 600, color: 'white', marginBottom: 8 }}>Career Trajectory</p>
                      <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 100, textTransform: 'capitalize', background: experience?.careerProgression === 'ascending' ? 'rgba(52,211,153,0.15)' : 'rgba(250,204,21,0.15)', color: experience?.careerProgression === 'ascending' ? '#34d399' : '#facc15' }}>{experience?.careerProgression}</span>
                      <p style={{ color: '#94a3b8', fontSize: 12, marginTop: 8 }}>{experience?.progressionNote}</p>
                    </div>
                  </div>
                </Card>
                <Card title="Education" icon={BookOpen} iconColor="#a78bfa" delay={0.2}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(education || []).map((edu, i) => (
                      <div key={i} style={{ padding: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                        <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{edu.degree} in {edu.field}</p>
                        <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{edu.institution}</p>
                        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                          <span style={{ color: '#475569', fontSize: 12 }}>{edu.year}</span>
                          {edu.gpa && <span style={{ color: '#34d399', fontSize: 12 }}>GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* INTERVIEW */}
          {activeTab === 'interview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { key: 'behavioral', label: 'Behavioral Questions', icon: User, color: '#22d3ee' },
                { key: 'technical', label: 'Technical Questions', icon: Brain, color: '#a78bfa' },
                { key: 'situational', label: 'Situational Questions', icon: MessageSquare, color: '#34d399' },
              ].map(({ key, label, icon, color }) => (
                <Card key={key} title={label} icon={icon} iconColor={color}>
                  {(interviewQuestions?.[key] || []).map((q, i) => <QCard key={i} q={q} index={i} />)}
                </Card>
              ))}
            </div>
          )}

          {/* CAREER */}
          {activeTab === 'career' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {[
                { key: 'immediateActions', label: 'Immediate Actions', icon: Zap, color: '#ef4444', delay: 0 },
                { key: 'shortTerm', label: 'Short-Term Goals', icon: Clock, color: '#fb923c', delay: 0.1 },
                { key: 'longTerm', label: 'Long-Term Vision', icon: TrendingUp, color: '#34d399', delay: 0.2 },
              ].map(({ key, label, icon, color, delay }) => (
                <Card key={key} title={label} icon={icon} iconColor={color} delay={delay}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(careerRecommendations?.[key] || []).map((action, i) => (
                      <div key={i} style={{ padding: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
                        <p style={{ color: 'white', fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{action.action}</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                          <span style={{ color: '#475569', fontSize: 12 }}>{action.timeframe}</span>
                          <span style={{ color: '#22d3ee', fontSize: 12 }}>{action.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Card title="Salary Estimate" icon={TrendingUp} iconColor="#34d399" delay={0.3}>
                  {careerRecommendations?.salaryRange && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32, color: 'white' }}>${careerRecommendations.salaryRange.min?.toLocaleString()}</span>
                        <span style={{ color: '#64748b' }}>—</span>
                        <span className="gradient-text" style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>${careerRecommendations.salaryRange.max?.toLocaleString()}</span>
                        <span style={{ color: '#64748b', fontSize: 14 }}>USD/yr</span>
                      </div>
                      <p style={{ color: '#64748b', fontSize: 12, marginTop: 8 }}>{careerRecommendations.salaryRange.note}</p>
                    </div>
                  )}
                </Card>
                <Card title="Alternative Roles" icon={ExternalLink} iconColor="#a78bfa" delay={0.35}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {(careerRecommendations?.alternativeRoles || []).map(role => <Tag key={role} color="rgba(139,92,246,0.1)" textColor="#a78bfa">{role}</Tag>)}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
