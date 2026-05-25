import { useApp } from '../../context/AppContext'

const INSIGHTS = [
  "You've logged consistently this week. Keep it up — patterns take time to spot! 📊",
  "Tracking your symptoms helps your doctor give better advice. You're doing great. 👨‍⚕️",
  "High-humidity days often correlate with worse symptoms. Watch the weather and plan ahead! 🌦️",
  "Rescue inhaler uses are worth logging — they help spot worsening control early. 💊",
  "Stress can tighten airways too. If today was rough, try a BroZen session! 🧘",
]

function getDailyInsight(): string {
  return INSIGHTS[new Date().getDay() % INSIGHTS.length]
}

export default function CheckInDone() {
  const { navigate, startBreathing, streak, userName } = useApp()

  const streakLabel = streak > 0
    ? `${streak} Day${streak > 1 ? 's' : ''} 🎯`
    : 'First Check-in! 🎉'

  const streakSub = streak >= 7
    ? "You're on fire! A whole week straight. 🔥"
    : streak >= 3
    ? "You're on a roll! Keep it going."
    : streak === 1
    ? "Great start! Come back tomorrow to build your streak."
    : "Logging streak starts now!"

  return (
    <div className="screen active" style={{ background: 'var(--bg)', justifyContent: 'center' }}>
      <div
        className="done-wrap"
        style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="done-em">🎉</div>
        <div className="done-ttl">
          {userName.trim() ? `Legend, ${userName.trim()}!` : "You're a legend, Bro!"}
        </div>
        <div className="done-sub">
          Check-in logged. Your lungs are proud.<br />Keep that streak alive! 🔥
        </div>

        <div className="streak-badge">
          <div className="sb-ic">🔥</div>
          <div>
            <div className="sb-cnt">{streakLabel}</div>
            <div className="sb-lbl">{streakSub}</div>
          </div>
        </div>

        <div className="insight-card">
          <div className="ins-ttl">🤖 Bro's Insight</div>
          <div className="ins-txt">{getDailyInsight()}</div>
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
