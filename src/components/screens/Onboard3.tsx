import { useApp } from '../../context/AppContext'

export default function Onboard3() {
  const { navigate, completeOnboarding, city, setCity } = useApp()

  return (
    <div className="screen active">
      <div className="ob-head">
        <div className="ob-steps">
          <div className="ob-dot done" />
          <div className="ob-dot done" />
          <div className="ob-dot now" />
        </div>
        <div className="ob-title">Almost there! 🏁</div>
        <div className="ob-sub">A couple of details to personalise your experience</div>
      </div>

      <div className="ob-body scroll">
        {/* City — used for AQI display */}
        <div className="ig">
          <div className="il">Your city</div>
          <input
            className="inp"
            type="text"
            placeholder="e.g. Mumbai, Delhi, Bangalore…"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 6 }}>
            Used to show local air quality and pollen forecasts
          </div>
        </div>

        {/* Emergency contact */}
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--charcoal)', margin: '18px 0 4px' }}>
          Emergency Contact 🆘
        </div>
        <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 14 }}>
          If things get tough, who should we notify?
        </div>

        <div className="warn-box">
          <div style={{ fontSize: 13, color: '#C53030', fontWeight: 600 }}>
            ⚠️ We strongly recommend adding this
          </div>
          <div style={{ fontSize: 12, color: '#8B4040', marginTop: 4, lineHeight: 1.5 }}>
            One tap during an attack sends them your location.
          </div>
        </div>

        <div className="ig">
          <div className="il">Their name</div>
          <input className="inp" type="text" placeholder="e.g. Mom, Rahul, Dr. Sharma" />
        </div>
        <div className="ig">
          <div className="il">Phone number</div>
          <input className="inp" type="tel" placeholder="+91 98765 43210" />
        </div>
        <div className="ig">
          <div className="il">Relationship</div>
          <input className="inp" type="text" placeholder="e.g. Parent, Friend, Doctor" />
        </div>

        <div className="info-box">
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}>
            🏥 Current medications{' '}
            <span style={{ fontWeight: 400, color: 'var(--light)' }}>(optional)</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4, marginBottom: 10 }}>
            Helps personalise your reminders
          </div>
          <input className="inp" type="text" placeholder="e.g. Budecort 200, Asthalin" />
          <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 8 }}>
            AzmaBro is not a clinical tool. Always follow your doctor's advice.
          </div>
        </div>
      </div>

      <div className="ob-foot">
        <button className="btn-primary" onClick={completeOnboarding}>
          Start Breathing Easy 🎉
        </button>
        <button className="btn-ghost" onClick={() => navigate('ob2')}>← Back</button>
      </div>
    </div>
  )
}
