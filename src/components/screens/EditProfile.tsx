import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const BRO_OPTIONS = [
  { emoji: '😎', label: 'Chill Bro'  },
  { emoji: '🏃', label: 'Active Bro' },
  { emoji: '💻', label: 'Tech Bro'   },
  { emoji: '🧘', label: 'Zen Bro'    },
  { emoji: '🦁', label: 'Fierce Bro' },
  { emoji: '🌊', label: 'Wave Bro'   },
]

const PET_OPTIONS = [
  { emoji: '🌬️', name: 'Windi'   },
  { emoji: '☁️',  name: 'Cloudy'  },
  { emoji: '🫧',  name: 'Bubbles' },
  { emoji: '🌀',  name: 'Swirly'  },
  { emoji: '🌿',  name: 'Leafy'   },
]

export default function EditProfile() {
  const {
    navigate, updateProfile,
    userName, city, broEmoji, petEmoji, petName,
  } = useApp()

  const [name,    setName]    = useState(userName)
  const [cityVal, setCityVal] = useState(city)
  const [bro,     setBro]     = useState(broEmoji)
  const [pet,     setPet]     = useState(petEmoji)
  const [petNm,   setPetNm]   = useState(petName)

  const save = () => {
    updateProfile({
      name:     name.trim()    || 'Anonymous Bro',
      city:     cityVal.trim() || 'Your City',
      broEmoji: bro,
      petEmoji: pet,
      petName:  petNm,
    })
    navigate('prof')
  }

  return (
    <div className="screen active">
      {/* Header */}
      <div className="scr-hdr">
        <div className="back" onClick={() => navigate('prof')}>← Back</div>
        <div className="scr-ttl">Edit Profile ✏️</div>
        <div className="scr-sub">Update your details</div>
      </div>

      <div className="scroll">
        <div style={{ padding: '20px 20px 100px' }}>

          {/* Avatar preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{
              width: 88, height: 88, background: 'linear-gradient(135deg,var(--sky),var(--teal))',
              borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 44, boxShadow: '0 8px 24px rgba(91,184,245,.35)',
            }}>
              {bro}
            </div>
          </div>

          {/* Name */}
          <div className="ig">
            <div className="il">Your Name</div>
            <input
              className="inp"
              type="text"
              placeholder="e.g. Rahul, Priya…"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* City */}
          <div className="ig" style={{ marginBottom: 22 }}>
            <div className="il">Your City</div>
            <input
              className="inp"
              type="text"
              placeholder="e.g. Mumbai, Delhi, Bangalore…"
              value={cityVal}
              onChange={e => setCityVal(e.target.value)}
            />
          </div>

          {/* Bro type */}
          <div className="il" style={{ marginBottom: 10 }}>Pick your Bro Emoji</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
            {BRO_OPTIONS.map(b => (
              <button
                key={b.emoji}
                onClick={() => setBro(b.emoji)}
                style={{
                  width: 56, height: 56, borderRadius: 16, fontSize: 26,
                  border: `2.5px solid ${bro === b.emoji ? 'var(--teal)' : '#E0ECF8'}`,
                  background: bro === b.emoji ? '#F0FDFC' : 'white',
                  cursor: 'pointer', transition: '.2s',
                }}
                title={b.label}
              >
                {b.emoji}
              </button>
            ))}
          </div>

          {/* Pet / companion */}
          <div className="il" style={{ marginBottom: 10 }}>Breathing Companion</div>
          <div className="pet-opts" style={{ marginBottom: 28 }}>
            {PET_OPTIONS.map(p => (
              <div key={p.name} className="pet-opt" onClick={() => { setPet(p.emoji); setPetNm(p.name); }}>
                <div
                  className={`pet-circle${pet === p.emoji ? ' on' : ''}`}
                  style={{ background: '#EEF7FF' }}
                >
                  {p.emoji}
                </div>
                <div className="pet-nm">{p.name}</div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={save}>Save Changes ✓</button>
          <button className="btn-ghost"  onClick={() => navigate('prof')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
