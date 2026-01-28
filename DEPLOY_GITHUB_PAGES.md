# Deploy to GitHub Pages

1. Встановіть gh-pages:
   npm install --save-dev gh-pages

2. Додайте у package.json:

"homepage": "https://YOUR_USERNAME.github.io/TodMusic-NewGen/",

У scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

3. Запустіть деплой:
   npm run deploy

---

- base у vite.config.js вже налаштовано.
- Замість YOUR_USERNAME вкажіть свій GitHub логін.
