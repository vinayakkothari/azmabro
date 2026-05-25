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
  { icon: '🔥', label: '14-day logging streak',  pct: (s: number) => Math.min(Math.round((s / 14) * 100), 100), sub: (s: number) => `${s} of 14 days complete` },
  { icon: '💊', label: 'Perfect medication week', pct: (a: number) => a, sub: (a: number) => a >= 100 ? 'Perfect week! 🌟' : `${a}% taken this session` },
]

export default function Profile() {
  const {
    broEmoji, userName, city,
    profiles, activeProfileId, switchProfile, startNewProfile,
    streak, checkIns, adherence,
  } = useApp()

  const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const totalCheckIns = checkIns.length

  // Unlock achievements dynamically
  const unlockedStreak7  = streak >= 7
  const unlockedMedMaster = adherence >= 80
  const unlockedZenStarter = true // always unlocked once you open BroZen
  const unlockedStreak30 = streak >= 30

  const achievements = [
    { emoji: '🔥', name: '7-Day Streak',  locked: !unlockedStreak7    },
    { emoji: '💊', name: 'Med Master',    locked: !unlockedMedMaster  },
    { emoji: '🧘', name: 'Zen Starter',   locked: !unlockedZenStarter },
    { emoji: '🌟', name: '30-Day Bro',    locked: !unlockedStreak30   },
    { emoji: '🏆', name: 'Lung Legend',   locked: streak < 60         },
  ]

  const displayName = userName.trim() || 'Anonymous Bro'
  const displayCity = city.trim() || 'Your City'

  return (
    <div className="screen active">
      <div className="prof-hdr">
        <div style={{ position: 'absolute', top: 50, right: 20, background: 'rgba(255,255,255,.2)', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: 'white', cursor: 'pointer' }}>
          Edit ✏️
        </div>
        <div className="prof-av">{broEmoji}</div>
        <div className="prof-nm">{displayName}</div>
        <div className="prof-tp">{displayCity}</div>
      </div>

      <div className="scroll">
        <div className="prof-stats">
          <div className="pst">
            <div className="pst-n">🔥{streak}</div>
            <div className="pst-l">Day Streak</div>
          </div>
          <div className="pst">
            <div className="pst-n">{totalCheckIns}</div>
            <div className="pst-l">Check-ins</div>
          </div>
          <div className="pst">
            <div className="pst-n">{adherence}%</div>
            <div className="pst-l">Adherence</div>
          </div>
        </div>

        <div className="prof-body">
          {/* Achievements */}
          <div className="sec">Achievements 🏆</div>
          <div className="ach-row">
            {achievements.map(a => (
              <div key={a.name} className={`ach-badge${a.locked ? ' locked' : ''}`}>
                <div className="ach-ic">{a.emoji}</div>
                <div className="ach-nm">{a.name}</div>
              </div>
            ))}
          </div>

          {/* Goals */}
          <div className="sec">Active Goals</div>
          <div className="goal-card">
            <div className="gl-row">
              <div className="gl-nm">🔥 14-day logging streak</div>
              <div className="gl-pct">{Math.min(Math.round((streak / 14) * 100), 100)}%</div>
            </div>
            <div className="gl-bg">
              <div className="gl-fill" style={{ width: `${Math.min((streak / 14) * 100, 100)}%` }} />
            </div>
            <div className="gl-sub">{streak} of 14 days complete</div>
          </div>
          <div className="goal-card">
            <div className="gl-row">
              <div className="gl-nm">💊 Perfect medication week</div>
              <div className="gl-pct">{adherence}%</div>
            </div>
            <div className="gl-bg">
              <div className="gl-fill" style={{ width: `${adherence}%` }} />
            </div>
            <div className="gl-sub">
              {adherence >= 100 ? 'Perfect! 🌟' : `${adherence}% taken today`}
            </div>
          </div>

          {/* Monthly report */}
          <div className="sec">Monthly Report 📄</div>
          <div className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ fontSize: 28 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>
                {monthLabel} Report
              </div>
              <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>
                {totalCheckIns} check-in{totalCheckIns !== 1 ? 's' : ''} · Symptom trends · Adherence
              </div>
            </div>
            <div style={{ background: '#EEF7FF', color: 'var(--sky)', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 20 }}>
              View / Share
            </div>
          </div>

          {/* ── Profiles ── */}
          <div className="sec" style={{ marginTop: 22 }}>Profiles 👥</div>
          {profiles.map(p => (
            <div key={p.id} className="profile-card">
              <div className="profile-card-av">{p.broEmoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--charcoal)' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--light)' }}>{p.city || 'No city set'}</div>
              </div>
              {p.id === activeProfileId ? (
                <div className="profile-card-active">Active ✓</div>
              ) : (
                <button className="profile-card-switch" onClick={() => switchProfile(p.id)}>
                  Switch
                </button>
              )}
            </div>
          ))}

          <button className="add-med" style={{ marginBottom: 14 }} onClick={startNewProfile}>
            + Add Profile
          </button>

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
