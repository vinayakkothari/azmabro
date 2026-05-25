import React, { createContext, useContext, useState } from 'react';
import type { ScreenId, BreathingSession, Medication } from '../types';

const DEFAULT_MEDICATIONS: Medication[] = [
  {
    id: 'm1',
    name: 'Budecort 200',
    label: 'Morning puff, bro 🌅',
    time: '8:00 AM · Maintenance inhaler',
    bg: '#EEF7FF',
    icon: '💨',
    taken: true,
  },
  {
    id: 'm2',
    name: 'Budecort 200',
    label: 'Night puff, bro 🌙',
    time: '10:00 PM · Maintenance inhaler',
    bg: '#F0FDFC',
    icon: '🌙',
    taken: false,
  },
  {
    id: 'm3',
    name: 'Asthalin 100',
    label: 'Rescue inhaler · Use only if needed',
    time: '⚠️ Log it if you use this',
    bg: '#FFF0F0',
    icon: '🆘',
    isRescue: true,
    taken: false,
  },
];

interface AppContextType {
  screen: ScreenId;
  navigate: (screen: ScreenId) => void;
  // Persona
  broEmoji: string;
  setBroEmoji: (e: string) => void;
  petEmoji: string;
  setPetEmoji: (e: string) => void;
  petName: string;
  setPetName: (n: string) => void;
  // Onboarding
  selectedConditions: Set<number>;
  toggleCondition: (i: number) => void;
  // Medications
  medications: Medication[];
  toggleMed: (id: string) => void;
  // Breathing
  breathingSession: BreathingSession | null;
  startBreathing: (session: BreathingSession) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<ScreenId>('splash');
  const [broEmoji, setBroEmoji] = useState('😎');
  const [petEmoji, setPetEmoji] = useState('🌬️');
  const [petName, setPetName] = useState('Windi');
  const [selectedConditions, setSelectedConditions] = useState<Set<number>>(new Set());
  const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
  const [breathingSession, setBreathingSession] = useState<BreathingSession | null>(null);

  const navigate = (next: ScreenId) => setScreen(next);

  const toggleCondition = (i: number) =>
    setSelectedConditions(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const toggleMed = (id: string) =>
    setMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m))
    );

  const startBreathing = (session: BreathingSession) => {
    setBreathingSession(session);
    setScreen('breath');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        navigate,
        broEmoji,
        setBroEmoji,
        petEmoji,
        setPetEmoji,
        petName,
        setPetName,
        selectedConditions,
        toggleCondition,
        medications,
        toggleMed,
        breathingSession,
        startBreathing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
