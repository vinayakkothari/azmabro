import React from 'react'
import { AppProvider } from './context/AppContext'
import PhoneFrame from './components/layout/PhoneFrame'

interface ErrorState { hasError: boolean; msg: string }

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, msg: '' }
  }
  static getDerivedStateFromError(err: Error): ErrorState {
    return { hasError: true, msg: err.message }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Inter, sans-serif', padding: 24, background: '#EEF7FF',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>😔</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1E2D3D', marginBottom: 8 }}>
            Something went wrong
          </div>
          <div style={{ fontSize: 13, color: '#8896A5', marginBottom: 24, textAlign: 'center' }}>
            {this.state.msg || 'AzmaBro hit an unexpected error.'}
          </div>
          <button
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{
              padding: '12px 24px', background: '#5BB8F5', color: 'white',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Reset & Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <PhoneFrame />
      </AppProvider>
    </ErrorBoundary>
  )
}
