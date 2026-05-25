import { useApp } from '../../context/AppContext'
import type { NavTab } from '../../types'

const NAV_ITEMS: { icon: string; label: string; tab: NavTab }[] = [
  { icon: '🏠', label: 'Home',    tab: 'home' },
  { icon: '📋', label: 'Track',   tab: 'sym'  },
  { icon: '🧘', label: 'BroZen',  tab: 'bz'   },
  { icon: '👤', label: 'Profile', tab: 'prof' },
]

interface Props {
  active: NavTab
}

export default function BottomNav({ active }: Props) {
  const { navigate } = useApp()

  return (
    <div className="bnav">
      {NAV_ITEMS.map(item => (
        <div
          key={item.tab}
          className={`bni${active === item.tab ? ' on' : ''}`}
          onClick={() => navigate(item.tab)}
        >
          <div className="bni-ic">{item.icon}</div>
          <div className="bni-lb">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
