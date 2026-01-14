# Release Notes

## Version 1.0.1

**Release Date:** 2026-01-14

### 🎵 New Features

- Додано анімовану вінілову платівку
- Реалізовано плавне CSS-обертання через `@keyframes spin`
- Підтримка прозорого фону PNG/SVG
- Можливість керування швидкістю обертання через CSS або inline-style в React

### ⚙️ Technical Details

- Animation: CSS `transform: rotate()`
- Timing function: `linear`
- Infinite loop: `animation-iteration-count: infinite`
- Dynamic speed control via React props

### 🖼 Example Usage

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo_image {
  animation: spin 3s linear infinite;
}
```
