# Tailwind-Init CLI 🚀🎨

![NPM Version](https://img.shields.io/npm/v/tailwind-init-cli?color=blue&style=for-the-badge)
![License](https://img.shields.io/npm/l/tailwind-init-cli?color=green&style=for-the-badge)
![Downloads](https://img.shields.io/npm/dt/tailwind-init-cli?color=orange&style=for-the-badge)

**Tailwind-Init CLI** is a blazing-fast 🏎️ one-command setup tool for **Tailwind CSS** in **Angular**, **React**, or **Next.js** projects!  
No more manual installs or editing CSS files—Tailwind-Init automates everything 🎯 so you can focus on **designing stunning UIs** 🌈✨.

---

## 🌟 Features

- ⚡ One-command setup for **Angular**, **React**, **Next.js**  
- 📦 Automatically installs dependencies:
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`
  - `@tailwindcss/postcss` (Angular / Next.js)  
- 📝 Generates PostCSS config files:
  - Angular → `.postcssrc.json`  
  - React → `postcss.config.cjs`  
  - Next.js → `postcss.config.mjs`  
- 🎨 Prepends Tailwind CSS imports to main CSS (`styles.css`, `index.css`, `globals.css`) **without removing existing content**  
- ❌ Throws errors for unsupported frameworks  
- 🔧 Supports `--force` to overwrite PostCSS config files

---

## 💾 Installation

### Global Install

```bash
npm install -g tailwind-init-cli
```

### Run via npx (no install needed)

```bash
npx tailwind-init-cli
```

---

## 🛠 Usage

| Framework | Command | Description |
|-----------|---------|-------------|
| Angular (default) | `tailwind-init` | Sets up Tailwind in Angular project |
| React | `tailwind-init --react` | Sets up Tailwind in React (CRA / Vite) |
| Next.js | `tailwind-init --nextjs` | Sets up Tailwind in Next.js (App Router) |

### Overwrite PostCSS Config

```bash
tailwind-init --react --force
```

---

## 📂 PostCSS Config Details

| Framework | File Name               | Format        |
|-----------|------------------------|---------------|
| Angular   | `.postcssrc.json`       | JSON          |
| React     | `postcss.config.cjs`    | CommonJS      |
| Next.js   | `postcss.config.mjs`    | ES Module     |

---

## 🎯 Why Tailwind-Init?

Tailwind-Init **saves you minutes of setup**, prevents errors, and ensures Tailwind CSS is correctly configured.  
Perfect for **fast prototyping**, **personal projects**, or **team projects**. 🎨💻

---

## 🔥 Quick Start Example

```bash
# Angular (default)
tailwind-init

# React
tailwind-init --react

# Next.js
tailwind-init --nextjs
```

---

## 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request.  
Let's make Tailwind-Init even faster, smarter, and more fun! 🎉✨

---

## 📜 License

MIT License © 2025 Arian Esmaeilzadeh  

---

💥 **Tailwind-Init CLI** = Fast ⚡ + Fun 🎨 + Productive 🚀. Start building **beautiful interfaces** in seconds! 🌈✨
