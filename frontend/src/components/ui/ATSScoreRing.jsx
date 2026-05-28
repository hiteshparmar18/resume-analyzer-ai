import { motion } from 'framer-motion'

const gradeColor = {
  'A+': '#22d3ee', 'A': '#22d3ee', 'A-': '#34d399',
  'B+': '#34d399', 'B': '#a3e635', 'B-': '#facc15',
  'C+': '#fb923c', 'C': '#f97316', 'D': '#ef4444', 'F': '#dc2626'
}

export default function ATSScoreRing({ score, grade, size = 200 }) {
  const radius = (size / 2) - 16
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = gradeColor[grade] || '#22d3ee'

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: color, opacity: 0.1, filter: 'blur(20px)'
      }} />
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 8px ${color}44)` }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.span
          style={{ fontFamily: 'Syne', fontWeight: 800, color, fontSize: size * 0.22, lineHeight: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>ATS Score</span>
        <motion.span
          style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color, marginTop: 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        >
          {grade}
        </motion.span>
      </div>
    </div>
  )
}
