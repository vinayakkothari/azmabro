import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ScreenId, BreathingSession, Medication, CheckIn, Profile } from '../types';

// ── Helpers ──────────────────────────────────────────────────────────────────

const TODAY = () => new Date().toISOString().split('T')[0];

function calculateStreak(checkIns: CheckIn[]): number {
  if (!checkIns.length) return 0;
  const dates = new Set(checkIns.map(c => c.date));
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    if (dates.has(key)) {
      streak++;
    } else if (i > 0) {
      break; // gap found
    }
  }
  return streak;
}

function adherencePct(meds: Medication[]): number {
  const nonRescue = meds.filter(m => !m.isRescue);
  if (!nonRescue.length) return 0;
  return Math.round((nonRescue.filter(m => m.taken).length / nonRescue.length) * 100);
}

// ── Default data ──────────────────────────────────────────────────────────────

const DEFAULT_MEDICATIONS: Medication[] = [
  { id: 'm1', name: 'Budecort 200', label: 'Morning puff, bro 🌅', time: '8:00 AM · Maintenance inhaler', bg: '#EEF7FF', icon: '💨', taken: false },
  { id: 'm2', name: 'Budecort 200', label: 'Night puff, bro 🌙',   time: '10:00 PM · Maintenance inhaler', bg: '#F0FDFC', icon: '🌙', taken: false },
  { id: 'm3', name: 'Asthalin 100', label: 'Rescue inhaler · Use only if needed', time: '⚠️ Log it if you use this', bg: '#FFF0F0', icon: '🆘', isRescue: true, taken: false },
];

// ── Storage helpers ───────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ── Lazy initialisers (run once, synchronously) ───────────────────────────────

function initProfiles() { return load<Profile[]>('az_profiles', []); }
function initCheckIns() { return load<CheckIn[]>('az_checkins', []); }
function initMeds()     { return load<Medication[]>('az_meds', DEFAULT_MEDICATIONS); }

function initActiveId(profiles: Profile[]) {
  const stored = localStorage.getItem('az_activeId');
  if (stored && profiles.find(p => p.id === stored)) return stored;
  return profiles[0]?.id ?? '';
}

function profileToState(p: Profile | undefined) {
  if (!p) return { userName: '', city: '', broEmoji: '😎', petEmoji: '🌬️', petName: 'Windi', selectedConditions: new Set<number>() };
  return {
    userName: p.name,
    city: p.city,
    broEmoji: p.broEmoji,
    petEmoji: p.petEmoji,
    petName: p.petName,
    selectedConditions: new Set<number>(p.conditions),
  };
}

function initScreen(profiles: Profile[]): ScreenId {
  return profiles.length > 0 ? 'home' : 'splash';
}

// ── Context type ──────────────────────────────────────────────────────────────

interface AppContextType {
  screen: ScreenId;
  navigate: (s: ScreenId) => void;

  // Active persona (editable during onboarding)
  userName: string; setUserName: (v: string) => void;
  city: string;     setCity:     (v: string) => void;
  broEmoji: string; setBroEmoji: (v: string) => void;
  petEmoji: string; setPetEmoji: (v: string) => void;
  petName: string;  setPetName:  (v: string) => void;
  selectedConditions: Set<number>;
  toggleCondition: (i: number) => void;

  // Multi-profile
  profiles: Profile[];
  activeProfileId: string;
  switchProfile: (id: string) => void;
  startNewProfile: () => void;
  completeOnboarding: () => void; // saves draft → new profile, goes home

  // Medications
  medications: Medication[];
  toggleMed: (id: string) => void;
  adherence: number;

  // Check-ins
  checkIns: CheckIn[];
  addCheckIn: (score: number) => void;
  streak: number;

  // Breathing
  breathingSession: BreathingSession | null;
  startBreathing: (s: BreathingSession) => void;
}

// ── Provider ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles]             = useState<Profile[]>(initProfiles);
  const [activeProfileId, setActiveProfileId] = useState<string>(() => initActiveId(initProfiles()));
  const [checkIns, setCheckIns]             = useState<CheckIn[]>(initCheckIns);
  const [medications, setMedications]       = useState<Medication[]>(initMeds);

  const active = profiles.find(p => p.id === activeProfileId);
  const initial = profileToState(active);

  const [screen, setScreen]   = useState<ScreenId>(() => initScreen(initProfiles()));
  const [userName, setUserName] = useState(initial.userName);
  const [city, setCity]         = useState(initial.city);
  const [broEmoji, setBroEmoji] = useState(initial.broEmoji);
  const [petEmoji, setPetEmoji] = useState(initial.petEmoji);
  const [petName, setPetName]   = useState(initial.petName);
  const [selectedConditions, setSelectedConditions] = useState<Set<number>>(initial.selectedConditions);
  const [breathingSession, setBreathingSession] = useState<BreathingSession | null>(null);

  // ── Persist ─────────────────────────────────────────────────────────────────
  useEffect(() => { save('az_profiles', profiles); }, [profiles]);
  useEffect(() => { save('az_activeId', activeProfileId); }, [activeProfileId]);
  useEffect(() => { save('az_checkins', checkIns); }, [checkIns]);
  useEffect(() => { save('az_meds', medications); }, [medications]);

  // ── Navigation ───────────────────────────────────────────────────────────────
  const navigate = useCallback((s: ScreenId) => setScreen(s), []);

  // ── Conditions ───────────────────────────────────────────────────────────────
  const toggleCondition = (i: number) =>
    setSelectedConditions(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  // ── Medications ──────────────────────────────────────────────────────────────
  const toggleMed = (id: string) =>
    setMedications(prev => prev.map(m => m.id === id ? { ...m, taken: !m.taken } : m));

  const adherence = adherencePct(medications);

  // ── Check-ins ────────────────────────────────────────────────────────────────
  const addCheckIn = useCallback((score: number) => {
    const today = TODAY();
    setCheckIns(prev => [...prev.filter(c => c.date !== today), { date: today, score }]);
  }, []);

  const streak = calculateStreak(checkIns);

  // ── Breathing ────────────────────────────────────────────────────────────────
  const startBreathing = (s: BreathingSession) => {
    setBreathingSession(s);
    setScreen('breath');
  };

  // ── Profiles ─────────────────────────────────────────────────────────────────
  const switchProfile = useCallback((id: string) => {
    const p = profiles.find(pr => pr.id === id);
    if (!p) return;
    const s = profileToState(p);
    setUserName(s.userName); setCity(s.city); setBroEmoji(s.broEmoji);
    setPetEmoji(s.petEmoji); setPetName(s.petName); setSelectedConditions(s.selectedConditions);
    setActiveProfileId(id);
    setScreen('home');
  }, [profiles]);

  const startNewProfile = useCallback(() => {
    // Reset draft to defaults
    setUserName(''); setCity(''); setBroEmoji('😎');
    setPetEmoji('🌬️'); setPetName('Windi'); setSelectedConditions(new Set());
    setScreen('ob1');
  }, []);

  const completeOnboarding = useCallback(() => {
    const id = Date.now().toString();
    const newProfile: Profile = {
      id,
      name: userName.trim() || 'Anonymous Bro',
      city: city.trim() || 'Your City',
      broEmoji, petEmoji, petName,
      conditions: Array.from(selectedConditions),
    };
    setProfiles(prev => [...prev, newProfile]);
    setActiveProfileId(id);
    setScreen('home');
  }, [userName, city, broEmoji, petEmoji, petName, selectedConditions]);

  return (
    <AppContext.Provider value={{
      screen, navigate,
      userName, setUserName, city, setCity,
      broEmoji, setBroEmoji, petEmoji, setPetEmoji, petName, setPetName,
      selectedConditions, toggleCondition,
      profiles, activeProfileId, switchProfile, startNewProfile, completeOnboarding,
      medications, toggleMed, adherence,
      checkIns, addCheckIn, streak,
      breathingSession, startBreathing,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
