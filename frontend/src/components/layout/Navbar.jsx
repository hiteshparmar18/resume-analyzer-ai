import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'rgba(3,5,7,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Zap size={16} color="white" />
        </div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: 'white' }}>
          Resume<span className="gradient-text">AI</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link
          to="/"
          style={{
            padding: '8px 16px', borderRadius: 10,
            fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 500,
            color: location.pathname === '/' ? 'white' : '#94a3b8',
            background: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
            textDecoration: 'none', transition: 'all 0.2s'
          }}
        >
          Home
        </Link>
        <Link to="/upload" className="btn-primary" style={{ padding: '8px 20px', fontSize: 14, textDecoration: 'none' }}>
          Analyze Resume
        </Link>
      </div>
    </motion.nav>
  )
}
