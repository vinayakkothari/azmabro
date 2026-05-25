import { useApp } from '../../context/AppContext'
import type { BreathingSession } from '../../types'
import BottomNav from '../layout/BottomNav'
import SOSFab from '../layout/SOSFab'

const SESSIONS: (BreathingSession & { emoji: string; bg: string; tags: { label: string; cls: string }[] })[] = [
  {
    emoji: '😌', bg: 'ex-b',
    name: 'Zen Bro',
    subtitle: '3 min · Box breathing to calm your system',
    duration: 180,
    tags: [{ label: '3 min', cls: 'tag-t' }, { label: 'Beginner', cls: 'tag-g' }],
  },
  {
    emoji: '💪', bg: 'ex-g',
    name: 'Lung Boost',
    subtitle: '5 min · Deep diaphragmatic breathing',
    duration: 300,
    tags: [{ label: '5 min', cls: 'tag-t' }, { label: 'Intermediate', cls: '' }],
  },
  {
    emoji: '🆘', bg: 'ex-o',
    name: 'Panic Calmer',
    subtitle: 'SOS · Quick relief when it gets tight',
    duration: 120,
    tags: [{ label: '2 min', cls: 'tag-t' }, { label: 'SOS', cls: 'tag-r' }],
  },
]

const DESC: Record<string, string> = {
  'Zen Bro':      'Box breathing to calm your nervous system. Perfect for winding down.',
  'Lung Boost':   'Deep diaphragmatic breathing to strengthen lung capacity over time.',
  'Panic Calmer': 'Feeling tight or anxious? This slows your breath fast. Use anytime.',
}

export default function BroZen() {
  const { navigate, startBreathing } = useApp()

  return (
    <div className="screen active">
      <div className="bz-hdr">
        <div
          className="back"
          style={{ color: 'rgba(255,255,255,.65)', marginBottom: 12 }}
          onClick={() => navigate('home')}
        >
          ← Back
        </div>
        <div className="bz-pre">Don't be brazen,</div>
        <div className="bz-ttl">Be BroZen 🧘</div>
        <div className="bz-sub">Pick a session. Your lungs will thank you.</div>
      </div>

      <div className="scroll">
        <div className="bz-body">
          {SESSIONS.map(s => (
            <div key={s.name} className="ex-card" onClick={() => startBreathing(s)}>
              <div className={`ex-ic-wrap ${s.bg}`}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div className="ex-nm">{s.name}</div>
                <div className="ex-ds">{DESC[s.name]}</div>
                <div className="ex-tags">
                  {s.tags.map(t => (
                    <span key={t.label} className={`ex-tag ${t.cls}`}>{t.label}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 18, color: 'var(--light)' }}>›</div>
            </div>
          ))}

          <div className="sec" style={{ marginTop: 6 }}>This Week</div>
          <div className="bz-stats">
            <div className="bz-stat">
              <div className="bz-sv" style={{ color: 'var(--sky)' }}>3</div>
              <div className="bz-sl">Sessions</div>
            </div>
            <div className="bz-stat">
              <div className="bz-sv" style={{ color: 'var(--teal)' }}>14</div>
              <div className="bz-sl">Minutes</div>
            </div>
            <div className="bz-stat">
              <div className="bz-sv">🔥 5</div>
              <div className="bz-sl">Streak</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="bz" />
      <SOSFab />
    </div>
  )
}
