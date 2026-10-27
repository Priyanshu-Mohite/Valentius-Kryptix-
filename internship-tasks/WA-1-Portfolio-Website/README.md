# WA-1 Portfolio Website

A modern, responsive, and recruiter-focused personal portfolio website crafted with semantic HTML5, modern CSS3, and vanilla JavaScript (no external framework dependencies).

## 🚀 Live Demo & Showcase
- **Mobile Responsive**: Tested across 375px (Mobile), 768px (Tablet), and 1280px+ (Desktop)
- **Features**: Dark/Light mode theme switch, filterable project showcase, interactive contact form, mobile drawer navigation, active scrollspy, and copy-to-clipboard toast notifications.

---

## 📋 Project Structure
```text
internship-tasks/WA-1-Portfolio-Website/
├── index.html          # Semantic HTML5 layout
├── style.css           # Modern CSS3 with design tokens & responsive breakpoints
├── script.js           # Vanilla JS for theme toggle, filters, nav & UX interactions
├── assets/             # Vector icons and generated project visuals
│   ├── project-1.svg
│   ├── project-2.svg
│   ├── project-3.svg
│   └── avatar.svg
└── README.md           # Submission documentation & setup instructions
```

---

## 🛠️ Tech Stack
- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3**: Custom CSS Properties (variables), Flexbox, CSS Grid, Glassmorphism, Fluid Typography (`clamp()`), and smooth transitions
- **Vanilla JavaScript**: ES6+, `IntersectionObserver` scrollspy, `localStorage` theme persistence, and dynamic project filtering

---

## 💻 How to Run Locally

### Option 1: VS Code Live Server (Recommended)
1. Open VS Code.
2. Open the `internship-tasks/WA-1-Portfolio-Website` directory.
3. Install the **Live Server** extension if not installed.
4. Right-click `index.html` and click **"Open with Live Server"**.
5. Your browser will launch `http://127.0.0.1:5500`.

### Option 2: Any Local HTTP Server
You can also run a simple local server using Python or Node.js:
```bash
# Python 3
python -m http.server 3000

# or Node (npx)
npx serve .
```

### Option 3: Direct File
Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🎯 Verification Checklist
- [x] **Hero Section**: Headline, one-line pitch, status badge, call to action buttons
- [x] **About Section**: Professional bio, career focus, key stats & highlights
- [x] **Skills Section**: Categorized into Frontend, Backend, Tools & Core skills
- [x] **Projects Section**: At least 3 detailed projects with tags, descriptions, GitHub links, and live demo links
- [x] **Contact Section**: Email, quick copy-to-clipboard, social handles (GitHub, LinkedIn, Twitter/X), and validated contact form
- [x] **Responsive Layout**: Fluid breakpoints verified for 375px, 768px, and 1280px+
- [x] **Semantic HTML**: Full compliance without `<div>` soup
- [x] **JavaScript Interactivity**: Dark/Light mode switcher with persistence, mobile drawer menu, dynamic project category filter, active nav spy, and contact form handler
- [x] **Zero Console Errors**: Pure vanilla JavaScript without missing dependencies or broken links
