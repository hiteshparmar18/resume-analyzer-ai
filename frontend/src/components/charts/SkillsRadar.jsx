import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'

export default function SkillsRadar({ breakdown }) {
  const data = Object.entries(breakdown).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
    fullMark: 100
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.06)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'DM Sans' }} />
        <Radar name="Score" dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} strokeWidth={2} />
        <Tooltip
          contentStyle={{ background: '#0D1520', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0', fontFamily: 'DM Sans' }}
          formatter={(v) => [`${v}/100`, 'Score']}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
