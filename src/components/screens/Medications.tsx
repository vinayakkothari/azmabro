import { useApp } from '../../context/AppContext'
import BottomNav from '../layout/BottomNav'
import SOSFab from '../layout/SOSFab'

export default function Medications() {
  const { navigate, medications, toggleMed, adherence } = useApp()
  const nonRescue = medications.filter(m => !m.isRescue)
  const taken     = nonRescue.filter(m => m.taken)

  const adherenceLabel =
    adherence >= 90 ? '🌟 Excellent!'
    : adherence >= 70 ? '👍 Good work!'
    : adherence >= 50 ? '💪 Keep going!'
    : '⚠️ Try to catch up'

  const monthLabel = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="screen active">
      <div className="scr-hdr">
        <div className="back" onClick={() => navigate('home')}>← Back</div>
        <div className="scr-ttl">Medications 💊</div>
        <div className="scr-sub">
          Today · {taken.length} of {nonRescue.length} taken
          {taken.length === nonRescue.length && nonRescue.length > 0 ? ' — nice! ✅' : ''}
        </div>
      </div>

      <div className="scroll">
        <div className="meds-body">
          <div className="sec">Today's Schedule</div>

          {medications.map(med => (
            <div
              key={med.id}
              className="med-card"
              style={med.isRescue ? { border: '2px dashed #FFD0D0', boxShadow: 'none' } : {}}
            >
              <div className="med-ic" style={{ background: med.bg }}>{med.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="med-nm">{med.name}</div>
                <div className="med-lbl" style={med.isRescue ? { color: '#E53E3E' } : {}}>{med.label}</div>
                <div className="med-tm">{med.time}</div>
              </div>
              <div
                className={`med-chk${med.taken ? ' done' : ''}`}
                onClick={() => toggleMed(med.id)}
              >
                {med.taken ? '✓' : ''}
              </div>
            </div>
          ))}

          <button className="add-med">+ Add medication</button>

          {/* Refill */}
          <div style={{ marginTop: 22 }}>
            <div className="sec">Refill Reminder 📦</div>
            <div className="refill-card">
              <div style={{ fontSize: 28 }}>📦</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>
                  Budecort 200 running low
                </div>
                <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>
                  Est. ~5 days left based on usage
                </div>
              </div>
              <div style={{ background: '#FFF9E6', color: '#B8860B', fontSize: 11, fontWeight: 700, padding: '5px 9px', borderRadius: 20 }}>
                Refill soon
              </div>
            </div>
          </div>

          {/* Adherence */}
          <div style={{ marginTop: 20 }}>
            <div className="sec">Adherence — {monthLabel}</div>
            <div className="card" style={{ padding: 15 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>
                  {adherence}% adherence
                </span>
                <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>
                  {adherenceLabel}
                </span>
              </div>
              <div className="adh-bar-bg">
                <div className="adh-bar-fill" style={{ width: `${adherence}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="sym" />
      <SOSFab />
    </div>
  )
}
