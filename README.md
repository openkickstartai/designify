# 🎨 Designify

> Interactive UI prototyping tool that enables developers to create prototypes directly from code with real-time adjustments and instant previews.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- **Live Code Editor** — Write React/JSX code with syntax highlighting and autocomplete
- **Instant Preview** — See your UI render in real-time as you type
- **Real-time Adjustments** — Tweak styles, props, and layout without restarting
- **Server-side Processing** — Secure code compilation via Node.js backend

## 🏗️ Architecture

```
src/
├── App.tsx                    # Application root & layout
├── components/
│   ├── CodeEditor.tsx         # Monaco-based code editor panel
│   └── PreviewPane.tsx        # Live-rendered preview output
└── server/
    └── server.ts              # Express backend for code processing
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9 (or yarn / pnpm)

### Installation

```bash
git clone https://github.com/<your-org>/designify.git
cd designify
npm install
```

### Development

```bash
# Start the backend server
npm run server

# In another terminal, start the React dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start prototyping.

### Production Build

```bash
npm run build
npm start
```

## 🖥️ Usage

1. Write or paste React/JSX code in the **Code Editor** panel.
2. Watch the **Preview Pane** update instantly.
3. Adjust styles and props in real-time — no manual refresh needed.

## 🤝 Contributing

Contributions are welcome and appreciated! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

Whether it's a bug report, feature idea, documentation fix, or code contribution — every bit helps.

## 📄 License

MIT © Designify Contributors
