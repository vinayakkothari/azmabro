import { useApp } from '../../context/AppContext'

const SCORE_CONFIG = {
  2: { label: 'Good',  color: '#4ECDC4', bg: '#E8FFF9', emoji: '😊' },
  1: { label: 'Okay',  color: '#FFD93D', bg: '#FFFBEB', emoji: '😐' },
  0: { label: 'Rough', color: '#FF5252', bg: '#FFF0F0', emoji: '😔' },
}

export default function MonthlyReport() {
  const { navigate, checkIns, adherence, medications, streak, userName } = useApp()

  const now      = new Date()
  const year     = now.getFullYear()
  const month    = now.getMonth()
  const monthLabel = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Filter check-ins to current month
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const monthCIs = checkIns.filter(c => c.date.startsWith(monthPrefix))

  // Build calendar data
  const firstDay   = new Date(year, month, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const ciMap = new Map(monthCIs.map(c => {
    const d = parseInt(c.date.split('-')[2], 10)
    return [d, c.score]
  }))

  // Stats
  const good  = monthCIs.filter(c => c.score === 2).length
  const okay  = monthCIs.filter(c => c.score === 1).length
  const rough = monthCIs.filter(c => c.score === 0).length
  const total = monthCIs.length
  const daysGone = now.getDate()
  const logPct   = Math.round((total / daysGone) * 100)

  const nonRescue = medications.filter(m => !m.isRescue)
  const takenToday = nonRescue.filter(m => m.taken).length

  // Build calendar cells (leading blanks + day cells)
  const cells: { day: number | null; score: number | null; isToday: boolean }[] = []
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, score: null, isToday: false })
  for (let d = 1; d <= daysInMonth; d++) {
    const score = ciMap.has(d) ? ciMap.get(d)! : null
    const isToday = d === now.getDate()
    cells.push({ day: d, score, isToday })
  }

  const dominantScore = good >= okay && good >= rough ? 2 : okay >= rough ? 1 : 0
  const dominant = SCORE_CONFIG[dominantScore as 0 | 1 | 2]

  return (
    <div className="screen active">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg,var(--sky),var(--teal))',
        padding: '54px 24px 28px',
      }}>
        <div className="back" style={{ color: 'white', marginBottom: 14 }} onClick={() => navigate('prof')}>
          ← Back
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>📄 Monthly Report</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,.82)', marginTop: 4 }}>{monthLabel}</div>

        {/* Quick summary */}
        <div style={{
          background: 'rgba(255,255,255,.18)', borderRadius: 16, padding: '13px 16px',
          marginTop: 16, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ fontSize: 32 }}>{dominant.emoji}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>
              {total > 0
                ? `Mostly ${dominant.label.toLowerCase()} this month`
                : 'No check-ins yet this month'}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.75)', marginTop: 2 }}>
              {userName.trim() || 'Bro'} · {total} day{total !== 1 ? 's' : ''} logged · {streak} day streak 🔥
            </div>
          </div>
        </div>
      </div>

      <div className="scroll">
        <div style={{ padding: '20px 18px 80px' }}>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
            {[
              { label: 'Days Logged', value: total, color: 'var(--sky)' },
              { label: 'Good Days',   value: good,  color: '#4ECDC4'   },
              { label: 'Rough Days',  value: rough, color: '#FF5252'   },
            ].map(s => (
              <div key={s.label} className="card" style={{ flex: 1, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--light)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Logging consistency */}
          <div className="sec">Logging Consistency</div>
          <div className="card" style={{ padding: 15, marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>
                {total} / {daysGone} days logged
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--teal)' }}>{logPct}%</span>
            </div>
            <div className="adh-bar-bg">
              <div className="adh-bar-fill" style={{ width: `${logPct}%` }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 6 }}>
              {logPct >= 80
                ? '🌟 Excellent consistency!'
                : logPct >= 50
                ? '👍 Good effort — keep it up!'
                : '💪 Try to log every day for better insights'}
            </div>
          </div>

          {/* Symptom breakdown */}
          {total > 0 && (
            <>
              <div className="sec">Symptom Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {([2, 1, 0] as const).map(score => {
                  const cfg  = SCORE_CONFIG[score]
                  const cnt  = [good, okay, rough][2 - score]
                  const pct  = total > 0 ? Math.round((cnt / total) * 100) : 0
                  return (
                    <div key={score} style={{
                      background: cfg.bg, borderRadius: 12, padding: '12px 14px',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <div style={{ fontSize: 22 }}>{cfg.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>
                            {cfg.label} days
                          </span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>
                            {cnt} ({pct}%)
                          </span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(0,0,0,.07)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: cfg.color, borderRadius: 3, transition: '.5s' }} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* Calendar */}
          <div className="sec">Calendar View</div>
          <div className="card" style={{ padding: 14, marginBottom: 18 }}>
            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 6 }}>
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--light)' }}>{d}</div>
              ))}
            </div>
            {/* Day cells */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
              {cells.map((cell, idx) => {
                if (!cell.day) return <div key={idx} />
                const cfg = cell.score !== null ? SCORE_CONFIG[cell.score as 0 | 1 | 2] : null
                return (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: '1',
                      borderRadius: 8,
                      background: cfg ? cfg.bg : cell.isToday ? '#EEF7FF' : '#F5F7FA',
                      border: cell.isToday ? '2px solid var(--sky)' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <div style={{
                      fontSize: 11,
                      fontWeight: cell.isToday ? 800 : 500,
                      color: cfg ? cfg.color : cell.isToday ? 'var(--sky)' : 'var(--light)',
                    }}>
                      {cell.day}
                    </div>
                    {cfg && (
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color }} />
                    )}
                  </div>
                )
              })}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
              {([2, 1, 0] as const).map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--light)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: SCORE_CONFIG[s].color }} />
                  {SCORE_CONFIG[s].label}
                </div>
              ))}
            </div>
          </div>

          {/* Medication adherence */}
          <div className="sec">Medication Adherence</div>
          <div className="card" style={{ padding: 15, marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--charcoal)' }}>
                Today: {takenToday}/{nonRescue.length} taken
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: adherence >= 80 ? 'var(--success)' : 'var(--warning)' }}>
                {adherence}%
              </span>
            </div>
            <div className="adh-bar-bg">
              <div className="adh-bar-fill" style={{ width: `${adherence}%` }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 6 }}>
              {adherence >= 90 ? '🌟 Excellent adherence!'
               : adherence >= 70 ? '👍 Good work — keep taking your meds'
               : '⚠️ Try not to miss doses — consistency matters'}
            </div>
          </div>

          {/* Share hint */}
          <div style={{
            background: '#F0FDFC', borderRadius: 14, padding: '14px 16px',
            border: '1.5px solid #B2EBE8', textAlign: 'center',
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>📤</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 4 }}>
              Share with your doctor
            </div>
            <div style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.5 }}>
              Screenshot this report to share your monthly summary with your healthcare provider.
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
