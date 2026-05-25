import { useApp } from '../../context/AppContext'
import type { ScreenId } from '../../types'
import StatusBar from './StatusBar'
import Splash from '../screens/Splash'
import Onboard1 from '../screens/Onboard1'
import Onboard2 from '../screens/Onboard2'
import Onboard3 from '../screens/Onboard3'
import Home from '../screens/Home'
import SymptomTracker from '../screens/SymptomTracker'
import CheckInDone from '../screens/CheckInDone'
import Medications from '../screens/Medications'
import BroZen from '../screens/BroZen'
import BreathingSession from '../screens/BreathingSession'
import Profile from '../screens/Profile'
import Emergency from '../screens/Emergency'
import EditProfile from '../screens/EditProfile'
import MonthlyReport from '../screens/MonthlyReport'

const SCREENS: Record<ScreenId, React.ComponentType> = {
  splash: Splash,
  ob1: Onboard1,
  ob2: Onboard2,
  ob3: Onboard3,
  home: Home,
  sym: SymptomTracker,
  done: CheckInDone,
  meds: Medications,
  bz: BroZen,
  breath: BreathingSession,
  prof: Profile,
  emg: Emergency,
  edit: EditProfile,
  report: MonthlyReport,
}

export default function PhoneFrame() {
  const { screen } = useApp()
  const CurrentScreen = SCREENS[screen]

  return (
    <div className="phone">
      <StatusBar />
      <CurrentScreen />
    </div>
  )
}
