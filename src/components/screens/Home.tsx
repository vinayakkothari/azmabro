import { useApp } from '../../context/AppContext'
import BottomNav from '../layout/BottomNav'
import SOSFab from '../layout/SOSFab'

// ── Daily tips — rotate by day of week ───────────────────────────────────────
const TIPS = [
  'Humidity is high today — dust mites thrive above 60%. Keep windows shut in the afternoon if you can. 🪟',
  'Pollen count is moderate. Consider wearing a mask outdoors and showering after coming home. 🌸',
  'Cold air can trigger bronchospasm. Try breathing through your nose to warm the air before it hits your lungs. 🌬️',
  'Keep your rescue inhaler within easy reach today — weather changes can trigger unexpected symptoms. 💊',
  'Staying hydrated helps keep airways moist and reduces mucus buildup. Aim for 8 glasses today! 💧',
  'Indoor air can be 5× more polluted than outside. Opening windows for 10 minutes in the morning helps. 🏠',
  'Exercise is great for lung health — try a short walk, but keep your inhaler handy just in case. 🚶',
]

// ── Helpers ──────────────────────────────────────────────────────────────────
function getGreeting(): string {
  const h = new Date().getHours()
  return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening'
}

function getDateString(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
}

function getDailyTip(): string {
  return TIPS[new Date().getDay()]
}

// score: 2=good (short bar), 1=ok (medium), 0=bad (tall bar), null=no data
const BAR_CONFIG: Record<number | 'null', { h: number; color: string }> = {
  2:      { h: 18, color: 'linear-gradient(180deg,#4ECDC4,#5BB8F5)' },
  1:      { h: 48, color: 'linear-gradient(180deg,#FFD93D,#FFA500)' },
  0:      { h: 82, color: 'linear-gradient(180deg,#FF5252,#FF7A7A)' },
  'null': { h: 8,  color: '#E0ECF8' },
}

function buildWeekBars(checkIns: { date: string; score: number }[]) {
  const dateMap = new Map(checkIns.map(c => [c.date, c.score]))
  const bars = []
  const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    const score = dateMap.has(key) ? dateMap.get(key)! : null
    bars.push({ day: days[d.getDay()], today: i === 0, score })
  }
  return bars
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const { navigate, petEmoji, city, userName, streak, checkIns, medications } = useApp()

  const greeting   = getGreeting()
  const dateStr    = getDateString()
  const tip        = getDailyTip()
  const weekBars   = buildWeekBars(checkIns)
  const displayCity = city.trim() || 'Your City'

  const takenToday = medications.filter(m => !m.isRescue && m.taken).length
  const totalMeds  = medications.filter(m => !m.isRescue).length
  const medsLabel  = takenToday === totalMeds ? `Meds ✅` : `Meds ${takenToday}/${totalMeds}`

  return (
    <div className="screen active">
      <div className="scroll">
        {/* ── Header ── */}
        <div className="home-hdr">
          <div>
            <div className="greet">
              {greeting}, {userName.trim() || 'Bro'}! 👋
            </div>
            <div className="greet-sub">{dateStr} · Let's check in</div>
          </div>
          <div className="pet-widget">
            <div className="pet-body">{petEmoji}</div>
            <div className="pet-speech">Breathe easy! 😌</div>
          </div>
          <div className="stat-pills">
            <div className="spill">🔥 {streak > 0 ? `${streak} day streak` : 'Start your streak!'}</div>
            <div className="spill">💊 {medsLabel}</div>
            <div className="spill">🌬️ {displayCity}</div>
          </div>
        </div>

        <div className="home-body">
          {/* Check-in banner */}
          <div className="ci-banner" onClick={() => navigate('sym')}>
            <div style={{ fontSize: 26 }}>💬</div>
            <div className="ci-txt">
              <div className="ci-lbl">Daily check-in</div>
              <div className="ci-ttl">How are the lungs today, {userName.trim() || 'Bro'}?</div>
            </div>
            <div className="ci-arr">→</div>
          </div>

          {/* AQI */}
          <div className="aqi-card">
            <div className="aqi-dot aqi-good">🌿</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--light)', fontWeight: 500 }}>
                Air Quality · {displayCity}
              </div>
              <div className="aqi-val">
                42 <span style={{ fontSize: 14, fontWeight: 500 }}>Good</span>
              </div>
              <div className="aqi-ds">Pollen: Low · Humidity: 68% · Wind: 12 km/h</div>
            </div>
            <div className="aqi-badge">Safe to go out 👍</div>
          </div>

          {/* Quick Actions */}
          <div className="sec">Quick Actions</div>
          <div className="act-grid">
            {[
              { ac: '#EEF7FF', ic: '📋', nm: 'Track Symptoms', ds: checkIns.length ? `Last: today` : 'Not logged today', screen: 'sym' },
              { ac: '#F0FDFC', ic: '💊', nm: 'Medications',    ds: `${takenToday} of ${totalMeds} taken${takenToday === totalMeds ? ' ✅' : ''}`, screen: 'meds' },
              { ac: '#F7FFE0', ic: '🧘', nm: 'BroZen',         ds: '3 exercises ready', screen: 'bz' },
              { ac: '#FFF0F0', ic: '🆘', nm: 'Emergency',      ds: 'One-tap SOS',       screen: 'emg' },
            ].map(card => (
              <div
                key={card.nm}
                className="act-card"
                style={{ '--ac': card.ac } as React.CSSProperties}
                onClick={() => navigate(card.screen as Parameters<typeof navigate>[0])}
              >
                <div className="act-ic">{card.ic}</div>
                <div className="act-nm">{card.nm}</div>
                <div className="act-ds">{card.ds}</div>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div className="tip-card">
            <div className="tip-lbl">💡 Bro Tip of the Day</div>
            <div className="tip-txt">{tip}</div>
          </div>

          {/* Weekly chart */}
          <div className="sec">Your Week at a Glance</div>
          <div className="mini-chart">
            <div className="bars">
              {weekBars.map((b, i) => {
                const cfg = BAR_CONFIG[b.score === null ? 'null' : b.score]
                const isToday = b.today
                return (
                  <div key={i} className="bar-wrap">
                    <div
                      className="bar"
                      style={{
                        height: `${cfg.h}%`,
                        background: isToday ? 'linear-gradient(180deg,#C8FF39,#A0D900)' : cfg.color,
                        ...(isToday ? { border: '2px solid #B0E800' } : {}),
                        minHeight: 4,
                      }}
                    />
                    <div
                      className="bar-lbl"
                      style={isToday ? { color: 'var(--sky)', fontWeight: 700 } : {}}
                    >
                      {b.day}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="chart-legend">
              <span><span className="leg-dot" style={{ background: '#4ECDC4' }} /> Good</span>
              <span><span className="leg-dot" style={{ background: '#FFD93D' }} /> Okay</span>
              <span><span className="leg-dot" style={{ background: '#FF5252' }} /> Rough</span>
              <span><span className="leg-dot" style={{ background: '#C8FF39' }} /> Today</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="home" />
      <SOSFab />
    </div>
  )
}
