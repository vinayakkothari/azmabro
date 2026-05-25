import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const BRO_TYPES = [
  { emoji: '😎', name: 'Chill Bro',   desc: 'Laid back. Gentle reminders. No stress.' },
  { emoji: '🏃', name: 'Active Bro',  desc: 'On the move. Exercise-aware alerts.' },
  { emoji: '💻', name: 'Tech Bro',    desc: 'Data-driven. Insights & stats.' },
  { emoji: '🧘', name: 'Zen Bro',     desc: 'Mindful. Breathing-first approach.' },
]

const PETS = [
  { emoji: '🌬️', name: 'Windi',   bg: '#EEF7FF' },
  { emoji: '☁️',  name: 'Cloudy',  bg: '#F0F9FF' },
  { emoji: '🫧',  name: 'Bubbles', bg: '#F5F0FF' },
  { emoji: '🌀',  name: 'Swirly',  bg: '#F0FDFC' },
  { emoji: '🌿',  name: 'Leafy',   bg: '#F0FDF4' },
]

export default function Onboard1() {
  const { navigate, setBroEmoji, petEmoji, setPetEmoji, setPetName } = useApp()
  const [selectedBro, setSelectedBro] = useState(0)

  const pickBro = (i: number) => {
    setSelectedBro(i)
    setBroEmoji(BRO_TYPES[i].emoji)
  }

  const pickPet = (pet: typeof PETS[0]) => {
    setPetEmoji(pet.emoji)
    setPetName(pet.name)
  }

  return (
    <div className="screen active">
      <div className="ob-head">
        <div className="ob-steps">
          <div className="ob-dot now" />
          <div className="ob-dot" />
          <div className="ob-dot" />
        </div>
        <div className="ob-title">Pick your Bro Type 🤙</div>
        <div className="ob-sub">This shapes how AzmaBro talks to you</div>
      </div>

      <div className="ob-body scroll">
        <div className="bro-grid">
          {BRO_TYPES.map((b, i) => (
            <div
              key={b.name}
              className={`bro-card${selectedBro === i ? ' sel' : ''}`}
              onClick={() => pickBro(i)}
            >
              <div className="bro-em">{b.emoji}</div>
              <div className="bro-nm">{b.name}</div>
              <div className="bro-ds">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="pet-row">
          <div className="pet-row-title">Choose your companion 👇</div>
          <div className="pet-opts">
            {PETS.map(pet => (
              <div key={pet.name} className="pet-opt" onClick={() => pickPet(pet)}>
                <div
                  className={`pet-circle${petEmoji === pet.emoji ? ' on' : ''}`}
                  style={{ background: pet.bg }}
                >
                  {pet.emoji}
                </div>
                <div className="pet-nm">{pet.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ob-foot">
        <button className="btn-primary" onClick={() => navigate('ob2')}>Next →</button>
      </div>
    </div>
  )
}
