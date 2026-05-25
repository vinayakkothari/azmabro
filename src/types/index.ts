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
  | 'emg';

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
