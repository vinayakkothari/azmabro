import { useApp } from '../../context/AppContext'
import BottomNav from '../layout/BottomNav'
import SOSFab from '../layout/SOSFab'

const WEEK_BARS = [
  { day: 'M', h: 35,  good: true  },
  { day: 'T', h: 60,  good: true  },
  { day: 'W', h: 88,  good: false },
  { day: 'T', h: 42,  good: true  },
  { day: 'F', h: 28,  good: true  },
  { day: 'S', h: 22,  good: true  },
  { day: 'S', h: 18,  today: true },
]

export default function Home() {
  const { navigate, petEmoji } = useApp()

  return (
    <div className="screen active">
      <div className="scroll">
        {/* ── Header ── */}
        <div className="home-hdr">
          <div>
            <div className="greet">Morning, Bro! 👋</div>
            <div className="greet-sub">Monday, 26 May · Let's check in</div>
          </div>
          <div className="pet-widget">
            <div className="pet-body">{petEmoji}</div>
            <div className="pet-speech">Breathe easy! 😌</div>
          </div>
          <div className="stat-pills">
            <div className="spill">🔥 7 day streak</div>
            <div className="spill">💊 Meds ✅</div>
            <div className="spill">🌬️ AQI 42</div>
          </div>
        </div>

        <div className="home-body">
          {/* Check-in banner */}
          <div className="ci-banner" onClick={() => navigate('sym')}>
            <div style={{ fontSize: 26 }}>💬</div>
            <div className="ci-txt">
              <div className="ci-lbl">Daily check-in</div>
              <div className="ci-ttl">How are the lungs today, Bro?</div>
            </div>
            <div className="ci-arr">→</div>
          </div>

          {/* AQI */}
          <div className="aqi-card">
            <div className="aqi-dot aqi-good">🌿</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--light)', fontWeight: 500 }}>
                Air Quality · Mumbai
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
              { ac: '#EEF7FF', ic: '📋', nm: 'Track Symptoms', ds: 'Last: 8 hrs ago',       screen: 'sym'  },
              { ac: '#F0FDFC', ic: '💊', nm: 'Medications',    ds: '2 of 2 taken ✅',       screen: 'meds' },
              { ac: '#F7FFE0', ic: '🧘', nm: 'BroZen',         ds: '3 exercises ready',      screen: 'bz'   },
              { ac: '#FFF0F0', ic: '🆘', nm: 'Emergency',      ds: 'One-tap SOS',            screen: 'emg'  },
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
            <div className="tip-txt">
              Humidity is at 68% today — dust mites thrive above 60%. Keep windows shut in the
              afternoon if you can. 🪟
            </div>
          </div>

          {/* Weekly chart */}
          <div className="sec">Your Week at a Glance</div>
          <div className="mini-chart">
            <div className="bars">
              {WEEK_BARS.map((b, i) => (
                <div key={i} className="bar-wrap">
                  <div
                    className="bar"
                    style={{
                      height: `${b.h}%`,
                      background: b.today
                        ? 'linear-gradient(180deg,#C8FF39,#A0D900)'
                        : b.good
                        ? 'linear-gradient(180deg,#4ECDC4,#5BB8F5)'
                        : 'linear-gradient(180deg,#FF5252,#FF7A7A)',
                      ...(b.today ? { border: '2px solid #B0E800' } : {}),
                    }}
                  />
                  <div
                    className="bar-lbl"
                    style={b.today ? { color: 'var(--sky)', fontWeight: 700 } : {}}
                  >
                    {b.day}
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <span><span className="leg-dot" style={{ background: '#4ECDC4' }} /> Good day</span>
              <span><span className="leg-dot" style={{ background: '#FF5252' }} /> Rough day</span>
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
