# AzmaBro 🫁

**Your friendly respiratory companion. Breathe easy, Bro.**

AzmaBro is a mobile-first app for asthma and respiratory health management. It helps people with asthma, bronchitis, or allergic rhinitis track symptoms, manage medications, practise breathing exercises, and trigger emergency alerts — all in one friendly, conversational interface.

🔗 **Live demo: [vinayakkothari.github.io/azmabro](https://vinayakkothari.github.io/azmabro/)**

---

## Features

| Screen | What it does |
|---|---|
| **Onboarding** | Pick your Bro Type (Chill / Active / Tech / Zen), choose a companion emoji, log conditions and emergency contact |
| **Home** | Daily greeting, live AQI card, quick-action grid, Bro Tip of the Day, weekly symptom bar chart |
| **Daily Check-in** | 4-step guided symptom flow (chest feel → breath sounds → effort → triggers) with a conversational tone |
| **Medications** | Scheduled dose tracker, rescue inhaler log, refill reminder, weekly adherence bar |
| **BroZen** | Guided breathing sessions — Zen Bro (box, 3 min), Lung Boost (diaphragmatic, 5 min), Panic Calmer (SOS, 2 min) |
| **Emergency** | One-tap SOS alert, live location share, quick-dial contact, rescue inhaler log shortcut |
| **Profile** | Stats (streak, check-ins, adherence), achievement badges, active goals, monthly report card |

---

## Tech stack

- **React 18** + **TypeScript** — component-based UI with full type safety
- **Vite** — fast dev server and production builds
- **Vanilla CSS** — design tokens via CSS custom properties, no CSS framework

---

## Getting started

```bash
git clone https://github.com/vinayakkothari/azmabro.git
cd azmabro        # ← the package.json lives here
npm install
npm run dev       # → http://localhost:5173
```

> **Note:** all `npm` commands must be run from inside the `azmabro/` directory (where `package.json` lives), not from the parent folder.

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Project structure

```
azmabro/
├── src/
│   ├── components/
│   │   ├── layout/          # PhoneFrame, StatusBar, BottomNav, SOSFab
│   │   └── screens/         # 12 screen components (Splash, Onboard 1-3,
│   │                        # Home, SymptomTracker, CheckInDone,
│   │                        # Medications, BroZen, BreathingSession,
│   │                        # Profile, Emergency)
│   ├── context/
│   │   └── AppContext.tsx    # Global state — navigation, persona, meds, breathing
│   ├── hooks/
│   │   └── useBreathingTimer.ts  # Phase/countdown logic for breathing sessions
│   ├── styles/
│   │   └── globals.css      # Full design system (tokens, layouts, components)
│   ├── types/
│   │   └── index.ts         # Shared TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── index.html               # Vite entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Design system

| Token | Value | Usage |
|---|---|---|
| `--sky` | `#5BB8F5` | Primary blue |
| `--teal` | `#3EC9BF` | Accent / success |
| `--charcoal` | `#1E2D3D` | Primary text / dark headers |
| `--lime` | `#C8FF39` | Highlight / breathing counter |
| `--danger` | `#FF5252` | Emergency / SOS |
| `--bg` | `#EEF7FF` | App background |

Font: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts.

---

## Disclaimer

> AzmaBro is a **self-management support tool only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always follow your doctor's guidance.

---

## License

MIT — see [LICENSE](LICENSE).
