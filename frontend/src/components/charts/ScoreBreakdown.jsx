import { motion } from 'framer-motion'

const COLORS = {
  formatting: '#22d3ee', keywords: '#a78bfa', experience: '#34d399',
  education: '#fb923c', skills: '#f472b6', achievements: '#facc15'
}

export default function ScoreBreakdown({ breakdown }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Object.entries(breakdown).map(([key, value], i) => (
        <motion.div key={key}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: '#94a3b8', fontSize: 13, textTransform: 'capitalize' }}>{key}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 500, color: COLORS[key] }}>{value}</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <motion.div
              style={{ height: '100%', borderRadius: 3, background: COLORS[key] }}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
