# AzmaBro 🫁

**Your friendly respiratory companion. Breathe easy, Bro.**

AzmaBro is a mobile-first prototype for an asthma and respiratory health management app. It helps people with asthma, bronchitis, or allergic rhinitis track symptoms, manage medications, practise breathing exercises, and trigger emergency alerts — all in one friendly, conversational interface.

---

## Features

| Screen | What it does |
|---|---|
| **Onboarding** | Pick your Bro Type (Chill / Active / Tech / Zen), choose a companion emoji, log conditions and emergency contact |
| **Home** | Daily greeting, live AQI card, quick-action grid, Bro Tip of the Day, weekly symptom bar chart |
| **Daily Check-in** | 4-step guided symptom flow (chest feel → breath sounds → effort → triggers) with a fun conversational tone |
| **Medications** | Scheduled dose tracker, rescue inhaler log, refill reminder, weekly adherence bar |
| **BroZen** | Guided breathing sessions — Zen Bro (box, 3 min), Lung Boost (diaphragmatic, 5 min), Panic Calmer (SOS, 2 min) |
| **Emergency** | One-tap SOS alert, live location share, quick-dial contact, rescue inhaler log shortcut |
| **Profile** | Stats (streak, check-ins, adherence), achievement badges, active goals, monthly report card |

---

## Running the prototype

This is a fully self-contained single-file prototype — no build step, no dependencies.

```bash
# Just open it in any browser
open index.html
```

Or serve it locally:

```bash
npx serve .
# → http://localhost:3000
```

The UI renders as a 390×844 iPhone frame centred on the page so it looks like a real device on desktop.

---

## Project structure

```
azmabro/
└── index.html    # Complete prototype (HTML + CSS + JS, ~1 300 lines)
```

All styles are written in vanilla CSS with CSS custom properties (`--sky`, `--teal`, `--charcoal`, etc.). All interactivity is vanilla JS — no frameworks.

---

## Design system at a glance

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
