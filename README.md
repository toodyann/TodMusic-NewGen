# 🎵 TodMusic NewGen

Modern music streaming web application built with React and Vite, featuring a clean minimalist design with dark and light theme support.

## ✨ Features

- 🎨 **Dual Theme Support** - Seamless switching between light and dark themes
- 🎯 **Minimalist Design** - Clean, modern interface inspired by popular streaming platforms
- 🔍 **Smart Search** - Intuitive search functionality for finding music
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 📱 **Responsive Layout** - Fully responsive design that works on all devices
- 🎭 **Smooth Animations** - Elegant transitions and hover effects

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** SCSS/Sass
- **Fonts:** Google Fonts (Montserrat, Momo Signature)
- **Code Quality:** ESLint

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd "TodMusic NewGen"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Theme System

The application features a robust theme system with two modes:

### Light Theme

- Clean white background (#FFFFFF)
- Dark text for optimal readability
- Subtle gray accents

### Dark Theme

- Pure black background (#000000)
- White text with high contrast
- Refined gray highlights

Themes are automatically saved to localStorage and persist across sessions.

## 📁 Project Structure

```
TodMusic NewGen/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media files
│   ├── components/     # React components
│   │   ├── Header.jsx
│   │   ├── Logo.jsx
│   │   ├── Input.jsx
│   │   └── ThemeToggle.jsx
│   ├── styles/
│   │   └── scss/
│   │       ├── Header/ # Header component styles
│   │       ├── fonts.scss
│   │       ├── header.scss
│   │       ├── main.scss
│   │       ├── reset.scss
│   │       └── variables.scss
│   └── main.jsx        # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Component Overview

### Header Component

Main navigation bar containing the logo, search input, and theme toggle button.

### Logo Component

Displays the TodMusic branding with custom typography.

### Input Component

Reusable search input with theme-aware styling and smooth focus states.

### ThemeToggle Component

Toggle button for switching between light and dark themes with animated icons.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️ by TodMusic Team

## 🙏 Acknowledgments

- Google Fonts for typography
- React team for the amazing framework
- Vite for blazing fast build tool
