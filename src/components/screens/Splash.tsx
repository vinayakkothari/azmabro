import { useApp } from '../../context/AppContext'

export default function Splash() {
  const { navigate } = useApp()

  return (
    <div
      className="screen active"
      style={{
        background: 'linear-gradient(160deg,#5BB8F5,#3EC9BF)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="sp-wrap"
        style={{ height: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div className="sp-logo">🫁</div>
        <div className="sp-name">AzmaBro</div>
        <div className="sp-tag">
          Your friendly respiratory companion.<br />Breathe easy, Bro 💨
        </div>
        <button className="btn-pill" onClick={() => navigate('ob1')}>
          Let's Go, Bro →
        </button>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '12px', marginTop: '16px' }}>
          Already a Bro?{' '}
          <span
            style={{ color: 'white', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate('home')}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}
