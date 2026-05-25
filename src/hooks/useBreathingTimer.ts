import { useState, useEffect } from 'react';

const PHASES = [
  { label: 'Inhale slowly, bro...', sec: 4, emoji: '😌' },
  { label: 'Hold it...', sec: 4, emoji: '😤' },
  { label: 'Exhale gently...', sec: 6, emoji: '😮‍💨' },
  { label: 'Rest...', sec: 2, emoji: '😶‍🌫️' },
] as const;

interface TimerState {
  elapsed: number;
  phaseIdx: number;
  phaseTimer: number;
}

export function useBreathingTimer(totalSeconds: number) {
  const [s, setS] = useState<TimerState>({
    elapsed: 0,
    phaseIdx: 0,
    phaseTimer: PHASES[0].sec,
  });

  // Reset whenever the session changes
  useEffect(() => {
    setS({ elapsed: 0, phaseIdx: 0, phaseTimer: PHASES[0].sec });
  }, [totalSeconds]);

  useEffect(() => {
    const id = setInterval(() => {
      setS(prev => {
        const elapsed = prev.elapsed + 1;
        const phaseTimer = prev.phaseTimer - 1;

        if (elapsed >= totalSeconds) {
          clearInterval(id);
          return { elapsed, phaseIdx: prev.phaseIdx, phaseTimer: 0 };
        }

        if (phaseTimer <= 0) {
          const phaseIdx = (prev.phaseIdx + 1) % PHASES.length;
          return { elapsed, phaseIdx, phaseTimer: PHASES[phaseIdx].sec };
        }

        return { elapsed, phaseIdx: prev.phaseIdx, phaseTimer };
      });
    }, 1000);

    return () => clearInterval(id);
  }, [totalSeconds]);

  const isComplete = s.elapsed >= totalSeconds;
  const phase = PHASES[s.phaseIdx];

  return {
    phaseLabel: isComplete ? 'Amazing work, Bro! 🎉' : phase.label,
    phaseEmoji: phase.emoji,
    countdown: Math.max(s.phaseTimer, 0),
    progress: Math.min((s.elapsed / totalSeconds) * 100, 100),
    isComplete,
  };
}
