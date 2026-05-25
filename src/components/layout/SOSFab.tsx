import { useApp } from '../../context/AppContext'

export default function SOSFab() {
  const { navigate } = useApp()
  return (
    <div className="sosfab" onClick={() => navigate('emg')}>🆘</div>
  )
}
