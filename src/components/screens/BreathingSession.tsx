import { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { useBreathingTimer } from '../../hooks/useBreathingTimer'

export default function BreathingSession() {
  const { navigate, breathingSession } = useApp()
  const duration = breathingSession?.duration ?? 180

  const { phaseLabel, phaseEmoji, countdown, progress, isComplete } = useBreathingTimer(duration)

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => navigate('bz'), 2200)
      return () => clearTimeout(t)
    }
  }, [isComplete, navigate])

  return (
    <div
      className="screen active"
      style={{ background: 'linear-gradient(160deg,#1E2D3D,#2D3F50)' }}
    >
      {/* Stop button */}
      <button
        style={{
          position: 'absolute', top: 50, left: 18, zIndex: 10,
          background: 'rgba(255,255,255,.1)', border: 'none',
          color: 'rgba(255,255,255,.7)', padding: '7px 13px', borderRadius: 20,
          fontSize: 13, cursor: 'pointer', fontFamily: "'Inter',sans-serif",
        }}
        onClick={() => navigate('bz')}
      >
        ✕ Stop
      </button>

      <div className="breath-wrap">
        <div className="breath-ttl">{breathingSession?.name ?? 'Zen Bro'}</div>
        <div className="breath-sub-txt">{breathingSession?.subtitle ?? '3 min · Calm & restore'}</div>

        <div className="ring-outer">
          <div className="ring-inner">{phaseEmoji}</div>
        </div>

        <div className="breath-phase">{phaseLabel}</div>
        <div className="breath-cnt">{isComplete ? '✓' : countdown}</div>

        <div className="breath-prog-bg">
          <div className="breath-prog-fill" style={{ width: `${progress}%` }} />
        </div>

        <button className="btn-stop" onClick={() => navigate('bz')}>End Session</button>
      </div>
    </div>
  )
}
