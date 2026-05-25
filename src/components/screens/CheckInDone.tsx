import { useApp } from '../../context/AppContext'

export default function CheckInDone() {
  const { navigate, startBreathing } = useApp()

  return (
    <div className="screen active" style={{ background: 'var(--bg)', justifyContent: 'center' }}>
      <div
        className="done-wrap"
        style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="done-em">🎉</div>
        <div className="done-ttl">You're a legend, Bro!</div>
        <div className="done-sub">
          Check-in logged. Your lungs are proud.<br />Keep that streak alive! 🔥
        </div>

        <div className="streak-badge">
          <div className="sb-ic">🔥</div>
          <div>
            <div className="sb-cnt">8 Days 🎯</div>
            <div className="sb-lbl">Logging streak! You're on a roll.</div>
          </div>
        </div>

        <div className="insight-card">
          <div className="ins-ttl">🤖 Bro's Insight</div>
          <div className="ins-txt">
            You've had mild symptoms 3 of the last 5 high-humidity days. Humidity might be your
            trigger, Bro — worth mentioning to your doc! 👨‍⚕️
          </div>
        </div>

        <button
          className="btn-primary"
          style={{ maxWidth: 300 }}
          onClick={() => navigate('home')}
        >
          Back to Home 🏠
        </button>
        <button
          className="btn-ghost"
          onClick={() => startBreathing({ name: 'Zen Bro', subtitle: '3 min · Calm & restore', duration: 180 })}
        >
          Fancy a BroZen session? 🧘
        </button>
      </div>
    </div>
  )
}
