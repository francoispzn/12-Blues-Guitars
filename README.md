# Blues Guitar

A native iOS app that teaches proper blues guitar finger placement through an interactive fretboard, chord diagrams, scale patterns, and step-by-step lessons.

Built with React + TypeScript + Vite, wrapped as a native iOS app with Capacitor.

![Platform](https://img.shields.io/badge/platform-iOS-lightgrey) ![Stack](https://img.shields.io/badge/stack-React%2019%20%2B%20TypeScript-blue) ![Build](https://img.shields.io/badge/build-Vite%208-purple)

---

## Features

- **Interactive Fretboard** — SVG-based guitar fretboard with tap-to-play notes via audio synthesis
- **Chord Library** — 12 essential blues chords (open & barre) with finger placement diagrams
- **Scale Explorer** — Pentatonic minor, blues scale, major pentatonic, and Mixolydian across all positions and keys
- **Structured Lessons** — 5 modules / 28 steps covering blues fundamentals from beginner to intermediate
- **Audio Playback** — Hear chords, scales, and individual notes (Web Audio API synthesis)
- **Dark / Light Mode** — Follows iOS system theme automatically, with a manual toggle
- **Progress Tracking** — Lesson completion saved locally on the device

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, TypeScript 5.9 |
| Build | Vite 8 |
| Native | Capacitor 8 (iOS) |
| Audio | Web Audio API (sawtooth + lowpass filter) |
| Styling | CSS custom properties, inline SVG styles |
| Routing | Hash-based (no external router) |

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9
- **Xcode** >= 15 (for iOS builds)
- An Apple ID (free account works for personal device installs)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/blues-guitar.git
cd blues-guitar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally (browser)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Hot module replacement is enabled — edits to components will appear instantly.

### 4. Production build

```bash
npm run build
```

Output goes to `dist/`.

---

## Install on iPhone / iPad

### 1. Build & sync

```bash
npm run build
npx cap sync ios
```

### 2. Open in Xcode

```bash
npx cap open ios
```

### 3. Configure signing

1. In Xcode, click the **App** project in the left sidebar
2. Go to the **Signing & Capabilities** tab
3. Under **Team**, select your Apple ID
   - First time? Go to **Xcode > Settings > Accounts** and add your Apple ID
4. Xcode will auto-create a provisioning profile

### 4. Run on your device

1. Connect your iPhone or iPad via USB
2. Select your device from the dropdown at the top of Xcode
3. Press **Play** (or `Cmd + R`)

> **First time only:** On your device, go to **Settings > General > VPN & Device Management**, tap your developer profile, and tap **Trust**. Then run again from Xcode.

### 5. After making code changes

```bash
npm run build && npx cap sync ios
```

Then press Play in Xcode again.

> **Note:** A free Apple ID lets you install on your own devices. The provisioning profile expires after 7 days, so you'll need to re-run from Xcode periodically. For permanent installs or TestFlight distribution, you'll need an [Apple Developer Program](https://developer.apple.com/programs/) membership ($99/year).

---

## Project Structure

```
src/
├── components/
│   ├── Fretboard.tsx          # Interactive SVG fretboard
│   ├── ChordDiagram.tsx       # Compact chord box diagrams
│   ├── FingerGuide.tsx        # Hand diagram with finger legend
│   └── Navigation.tsx         # Bottom tab bar + theme toggle
├── pages/
│   ├── HomePage.tsx           # Landing page with progress overview
│   ├── ChordsPage.tsx         # Chord library with open/barre filters
│   ├── ScalesPage.tsx         # Scale explorer (type, key, position)
│   ├── LessonsPage.tsx        # Lesson module list with progress
│   └── LessonDetailPage.tsx   # Step-by-step lesson viewer
├── data/
│   ├── chords.ts              # 12 chord definitions
│   ├── scales.ts              # 4 scale types × 5 positions
│   ├── lessons.ts             # 5 modules / 28 lesson steps
│   ├── notes.ts               # MIDI mapping & fretboard math
│   └── types.ts               # Shared TypeScript types
├── services/
│   └── audioEngine.ts         # Web Audio API synthesizer
├── App.tsx                    # Router + theme state
├── main.tsx                   # Entry point
└── index.css                  # Theme variables + global styles

ios/                           # Capacitor-generated Xcode project
capacitor.config.ts            # Capacitor configuration
```

---

## Screenshots

*Coming soon*
