export type ScreenId =
  | 'splash'
  | 'ob1'
  | 'ob2'
  | 'ob3'
  | 'home'
  | 'sym'
  | 'done'
  | 'meds'
  | 'bz'
  | 'breath'
  | 'prof'
  | 'emg'
  | 'edit'
  | 'report';

export type NavTab = 'home' | 'sym' | 'bz' | 'prof';

export interface BreathingSession {
  name: string;
  subtitle: string;
  duration: number; // seconds
}

export interface Medication {
  id: string;
  name: string;
  label: string;
  time: string;
  bg: string;
  icon: string;
  isRescue?: boolean;
  taken: boolean;
}

/** score: 0 = rough day, 1 = okay, 2 = good day */
export interface CheckIn {
  date: string;   // YYYY-MM-DD
  score: number;
}

export interface Profile {
  id: string;
  name: string;
  city: string;
  broEmoji: string;
  petEmoji: string;
  petName: string;
  conditions: number[];
}
