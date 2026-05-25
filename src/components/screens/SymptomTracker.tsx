import { useState } from 'react'
import { useApp } from '../../context/AppContext'

interface Choice {
  emoji: string
  title: string
  sub: string
}

interface Step {
  question: string
  choices: Choice[]
  multi: boolean
}

const STEPS: Step[] = [
  {
    question: 'Hey there! How are your lungs feeling today, Bro? 🫁',
    multi: false,
    choices: [
      { emoji: '😮', title: 'Tight & Tricky',    sub: 'Significant chest tightness / discomfort' },
      { emoji: '😐', title: 'A Little Snug',      sub: 'Mild tightness, manageable today' },
      { emoji: '😊', title: 'Breathing Easy!',    sub: 'No chest tightness at all' },
    ],
  },
  {
    question: 'Any unwelcome sounds in your breath today? 👂',
    multi: false,
    choices: [
      { emoji: '🔊', title: 'Wheezy Whistle',  sub: 'Wheezing present' },
      { emoji: '💨', title: 'Just a Cough',     sub: 'Coughing, but no wheeze' },
      { emoji: '🔇', title: 'Quiet & Clear',    sub: 'No wheezing or unusual sounds' },
    ],
  },
  {
    question: "How's the breathing effort, Bro? 💨",
    multi: false,
    choices: [
      { emoji: '😤', title: 'Hard Work!',   sub: 'Struggling to breathe' },
      { emoji: '😌', title: 'A Bit Tough',  sub: 'Noticeable effort, manageable' },
      { emoji: '🧘', title: 'Smooth Flow',  sub: 'Breathing easily today' },
    ],
  },
  {
    question: 'Spotted any triggers around you today? Pick all that apply 🕵️',
    multi: true,
    choices: [
      { emoji: '🚬', title: 'Smoke Signal',   sub: 'Cigarette, vape, shisha' },
      { emoji: '🌿', title: 'Pollen Party',   sub: 'Felt like high pollen today' },
      { emoji: '🌫️', title: 'Dusty Musty',   sub: 'Dust, construction nearby' },
      { emoji: '👃', title: 'Strong Smells',  sub: 'Perfume, cleaning products' },
      { emoji: '🤧', title: 'Felt a Cold?',   sub: 'Could be a new illness' },
      { emoji: '🤷', title: 'Not Sure Yet',   sub: 'Nothing obvious today' },
    ],
  },
]

export default function SymptomTracker() {
  const { navigate, broEmoji } = useApp()
  const [stepIdx, setStepIdx] = useState(0)
  const [single, setSingle] = useState<(number | null)[]>([null, null, null, null])
  const [multi, setMulti] = useState<Set<number>>(new Set())

  const step = STEPS[stepIdx]

  const pickSingle = (i: number) => {
    const next = [...single]
    next[stepIdx] = i
    setSingle(next)
  }

  const pickMulti = (i: number) => {
    const next = new Set(multi)
    next.has(i) ? next.delete(i) : next.add(i)
    setMulti(next)
  }

  const isSelected = (i: number) =>
    step.multi ? multi.has(i) : single[stepIdx] === i

  const next = () => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(s => s + 1)
      setMulti(new Set())
    } else {
      navigate('done')
    }
  }

  return (
    <div className="screen active">
      <div className="scr-hdr">
        <div className="back" onClick={() => navigate('home')}>← Back</div>
        <div className="scr-ttl">Daily Check-in 💬</div>
        <div className="scr-sub">Takes about 30 seconds. Promise, Bro.</div>
      </div>

      <div className="scroll">
        <div className="sym-flow">
          {/* Progress */}
          <div className="prog">
            {STEPS.map((_, i) => (
              <div key={i} className={`prog-seg${i <= stepIdx ? ' done' : ''}`} />
            ))}
          </div>

          {/* Bro message */}
          <div className="bro-msg">
            <div className="bro-av">{broEmoji}</div>
            <div className="bro-bub">{step.question}</div>
          </div>

          {/* Choices */}
          <div className="choices">
            {step.choices.map((c, i) => (
              <div
                key={i}
                className={`choice${isSelected(i) ? (step.multi ? ' multi-sel' : ' sel') : ''}`}
                onClick={() => step.multi ? pickMulti(i) : pickSingle(i)}
              >
                <div className="ch-em">{c.emoji}</div>
                <div className="ch-txt">
                  <div className="ch-ttl">{c.title}</div>
                  <div className="ch-sub">{c.sub}</div>
                </div>
                <div className="ch-radio">{isSelected(i) ? '✓' : ''}</div>
              </div>
            ))}
          </div>

          {stepIdx === STEPS.length - 1 && (
            <input
              className="inp"
              style={{ marginTop: 14 }}
              type="text"
              placeholder="🎤 Voice note or type anything..."
            />
          )}

          <button className="btn-primary" style={{ marginTop: 14 }} onClick={next}>
            {stepIdx === STEPS.length - 1 ? 'Done ✅' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
