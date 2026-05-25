import { useApp } from '../../context/AppContext'
import BottomNav from '../layout/BottomNav'
import SOSFab from '../layout/SOSFab'

const ACHIEVEMENTS = [
  { emoji: '🔥', name: '7-Day Streak', locked: false },
  { emoji: '💊', name: 'Med Master',   locked: false },
  { emoji: '🧘', name: 'Zen Starter',  locked: false },
  { emoji: '🌟', name: '30-Day Bro',   locked: true  },
  { emoji: '🏆', name: 'Lung Legend',  locked: true  },
]

const GOALS = [
  { icon: '🔥', label: '14-day logging streak',      pct: 57, sub: '8 of 14 days complete' },
  { icon: '💊', label: 'Perfect medication week',     pct: 85, sub: 'Almost there! 2 days to go' },
  { icon: '🧘', label: '5 BroZen sessions',           pct: 60, sub: '3 of 5 done this week' },
]

export default function Profile() {
  const { broEmoji } = useApp()

  return (
    <div className="screen active">
      <div className="prof-hdr">
        <div style={{ position: 'absolute', top: 50, right: 20, background: 'rgba(255,255,255,.2)', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
          Edit ✏️
        </div>
        <div className="prof-av">{broEmoji}</div>
        <div className="prof-nm">Vinayak</div>
        <div className="prof-tp">Chill Bro · Asthma · Mumbai</div>
      </div>

      <div className="scroll">
        <div className="prof-stats">
          <div className="pst"><div className="pst-n">🔥8</div><div className="pst-l">Day Streak</div></div>
          <div className="pst"><div className="pst-n">47</div><div className="pst-l">Check-ins</div></div>
          <div className="pst"><div className="pst-n">85%</div><div className="pst-l">Adherence</div></div>
        </div>

        <div className="prof-body">
          <div className="sec">Achievements 🏆</div>
          <div className="ach-row">
            {ACHIEVEMENTS.map(a => (
              <div key={a.name} className={`ach-badge${a.locked ? ' locked' : ''}`}>
                <div className="ach-ic">{a.emoji}</div>
                <div className="ach-nm">{a.name}</div>
              </div>
            ))}
          </div>

          <div className="sec">Active Goals</div>
          {GOALS.map(g => (
            <div key={g.label} className="goal-card">
              <div className="gl-row">
                <div className="gl-nm">{g.icon} {g.label}</div>
                <div className="gl-pct">{g.pct}%</div>
              </div>
              <div className="gl-bg">
                <div className="gl-fill" style={{ width: `${g.pct}%` }} />
              </div>
              <div className="gl-sub">{g.sub}</div>
            </div>
          ))}

          <div className="sec">Monthly Report 📄</div>
          <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ fontSize: 28 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>May 2026 Report</div>
              <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>Symptom trends, triggers, adherence</div>
            </div>
            <div style={{ background: '#EEF7FF', color: 'var(--sky)', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 20 }}>
              View / Share
            </div>
          </div>

          <div className="disclaimer">
            ⚕️ <strong>Disclaimer:</strong> AzmaBro is for self-management support only. It is not
            a substitute for professional medical advice. Always consult your doctor.
          </div>
        </div>
      </div>

      <BottomNav active="prof" />
      <SOSFab />
    </div>
  )
}
