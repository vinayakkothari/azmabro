import { useState } from 'react'
import { useApp } from '../../context/AppContext'

type SOSState = 'idle' | 'alerting' | 'sent'

export default function Emergency() {
  const { navigate, startBreathing } = useApp()
  const [sos, setSos] = useState<SOSState>('idle')

  const triggerSOS = () => {
    setSos('alerting')
    setTimeout(() => setSos('sent'), 1600)
  }

  const sosBackground =
    sos === 'sent'     ? '#E8FFE8' :
    sos === 'alerting' ? '#FFE8E8' : 'white'

  return (
    <div
      className="screen active"
      style={{ background: 'linear-gradient(160deg,#C0392B,#E74C3C)' }}
    >
      <button className="emg-back" onClick={() => navigate('home')}>← Back to safety</button>

      <div className="emg-wrap">
        <div className="emg-ic">🆘</div>
        <div className="emg-ttl">Emergency Mode</div>
        <div className="emg-sub">
          Stay calm, Bro. You've got this.<br />Tap SOS to alert your emergency contact.
        </div>

        <button className="sos-btn" style={{ background: sosBackground }} onClick={triggerSOS}>
          <div className="sos-lbl">
            {sos === 'sent' ? '✓' : sos === 'alerting' ? '...' : 'SOS'}
          </div>
          <div className="sos-sub-lbl">
            {sos === 'sent' ? 'Contact notified' : sos === 'alerting' ? 'Alerting contact...' : 'Tap to alert'}
          </div>
        </button>

        <div className="emg-actions">
          <div
            className="emg-act"
            onClick={() => startBreathing({ name: 'Panic Calmer', subtitle: 'SOS · Quick relief', duration: 120 })}
          >
            <div className="emg-a-ic">🧘</div>
            <div className="emg-a-lb">Start Panic Calmer breathing</div>
          </div>
          <div className="emg-act">
            <div className="emg-a-ic">📍</div>
            <div className="emg-a-lb">Share live location with contact</div>
          </div>
          <div className="emg-act">
            <div className="emg-a-ic">📞</div>
            <div className="emg-a-lb">Call emergency contact</div>
          </div>
          <div className="emg-act" onClick={() => navigate('meds')}>
            <div className="emg-a-ic">💊</div>
            <div className="emg-a-lb">Log rescue inhaler use</div>
          </div>
        </div>
      </div>
    </div>
  )
}
