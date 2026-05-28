import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Target, Brain, TrendingUp, MessageSquare, Download, ArrowRight, CheckCircle, Star } from 'lucide-react'
import Navbar from '../components/layout/Navbar'

const features = [
  { icon: Target, title: 'ATS Score', desc: 'Get your exact ATS compatibility score with detailed 6-dimension breakdown.', color: '#22d3ee', bg: 'rgba(6,182,212,0.1)' },
  { icon: Brain, title: 'AI Analysis', desc: 'Gemini AI performs deep analysis identifying strengths and critical weaknesses.', color: '#a78bfa', bg: 'rgba(139,92,246,0.1)' },
  { icon: TrendingUp, title: 'Skill Gap Analysis', desc: 'Discover missing skills and get curated learning resources to bridge gaps.', color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  { icon: MessageSquare, title: 'Interview Prep', desc: 'Get 15+ tailored questions across behavioral, technical, and situational.', color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
  { icon: TrendingUp, title: 'Career Roadmap', desc: 'Receive a personalized career plan with immediate and long-term actions.', color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
  { icon: Download, title: 'PDF Report', desc: 'Download a comprehensive, professionally formatted report instantly.', color: '#818cf8', bg: 'rgba(129,140,248,0.1)' },
]

const stats = [
  { value: '95%', label: 'ATS Accuracy' },
  { value: '2min', label: 'Analysis Time' },
  { value: '15+', label: 'Interview Questions' },
  { value: '100%', label: 'Free with Gemini' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, padding: '128px 24px 80px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
            borderRadius: 100, padding: '6px 16px', marginBottom: 32
          }}>
            <Zap size={14} color="#22d3ee" />
            <span style={{ color: '#22d3ee', fontSize: 14, fontWeight: 500 }}>Powered by Gemini AI — 100% Free</span>
          </div>

          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(36px, 7vw, 72px)', color: 'white', lineHeight: 1.05, marginBottom: 24 }}>
            Your Resume,{' '}
            <span className="gradient-text">Analyzed</span>{' '}
            by AI
          </h1>

          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Upload your PDF and get a comprehensive ATS score, skill gap analysis,
            tailored interview prep, and career roadmap — in under 2 minutes, completely free.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/upload" className="btn-primary" style={{ fontSize: 16, padding: '14px 36px', textDecoration: 'none' }}>
              Analyze My Resume <ArrowRight size={18} />
            </Link>
            <a href="#features" className="btn-ghost" style={{ fontSize: 16 }}>See How It Works</a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 600, margin: '48px auto 0', }}
        >
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
              <div className="gradient-text" style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 24 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: 'white', marginBottom: 16 }}>
              Everything You Need to <span className="gradient-text">Land the Job</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
              Our AI analyzes every aspect of your resume giving you actionable insights.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((feat, i) => (
              <motion.div key={feat.title} className="glass-card-hover"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{ padding: 24 }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: feat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <feat.icon size={22} color={feat.color} />
                </div>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, color: 'white', marginBottom: 8 }}>{feat.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px 80px' }}>
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: 680, margin: '0 auto', padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,182,212,0.05), rgba(139,92,246,0.05))', pointerEvents: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 20 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={20} color="#facc15" fill="#facc15" />)}
          </div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32, color: 'white', marginBottom: 16 }}>
            Ready to Supercharge Your Job Search?
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
            Upload your PDF resume and get a full AI analysis completely free — no credit card, no signup required.
          </p>
          <Link to="/upload" className="btn-primary" style={{ fontSize: 17, padding: '14px 40px', textDecoration: 'none' }}>
            Get Free Analysis <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#475569', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
          ResumeAI · Powered by Gemini AI · Built for job seekers
        </p>
      </footer>
    </div>
  )
}
