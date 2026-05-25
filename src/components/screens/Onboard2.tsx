import { useApp } from '../../context/AppContext'

const CONDITIONS = [
  { emoji: '🌬️', name: 'Asthma',               desc: 'Wheeze, tightness, breathlessness' },
  { emoji: '🤧', name: 'Bronchitis',             desc: 'Persistent cough, chest discomfort' },
  { emoji: '🌿', name: 'Allergic Rhinitis',      desc: 'Pollen, dust, pet allergies' },
  { emoji: '🧐', name: 'Just being mindful',     desc: 'No diagnosis, staying aware' },
  { emoji: '👶', name: 'Tracking for a child',   desc: 'Parent / carer mode' },
]

export default function Onboard2() {
  const { navigate, selectedConditions, toggleCondition } = useApp()

  return (
    <div className="screen active">
      <div className="ob-head">
        <div className="ob-steps">
          <div className="ob-dot done" />
          <div className="ob-dot now" />
          <div className="ob-dot" />
        </div>
        <div className="ob-title">What are you managing? 🫁</div>
        <div className="ob-sub">Select all that apply — no judgment here</div>
      </div>

      <div className="ob-body scroll">
        <div className="cond-list">
          {CONDITIONS.map((c, i) => (
            <div
              key={c.name}
              className={`cond-card${selectedConditions.has(i) ? ' sel' : ''}`}
              onClick={() => toggleCondition(i)}
            >
              <div className="cond-ic">{c.emoji}</div>
              <div>
                <div className="cond-nm">{c.name}</div>
                <div className="cond-ds">{c.desc}</div>
              </div>
              <div className="cond-chk">{selectedConditions.has(i) ? '✓' : ''}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ob-foot">
        <button className="btn-primary" onClick={() => navigate('ob3')}>Next →</button>
        <button className="btn-ghost"   onClick={() => navigate('ob1')}>← Back</button>
      </div>
    </div>
  )
}
