import { AppProvider } from './context/AppContext'
import PhoneFrame from './components/layout/PhoneFrame'

export default function App() {
  return (
    <AppProvider>
      <PhoneFrame />
    </AppProvider>
  )
}
