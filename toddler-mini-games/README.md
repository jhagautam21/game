# Toddler Mini‑Games (3+)

Tiny tap‑friendly games for toddlers: **Colors**, **Counting**, and **Shapes**.

## Run locally
```bash
npm install
npm run dev
```

Open the URL printed in the terminal.

## Build
```bash
npm run build
npm run preview
```

## Deploy
- **Vercel/Netlify**: Import the repo. Build command: `npm run build`. Output dir: `dist`. (No extra config needed.)
- **GitHub Pages**:
  1. Add this to `package.json`:
     ```json
     {
       "homepage": "https://<your-user>.github.io/<repo>"
     }
     ```
  2. Install gh-pages: `npm i -D gh-pages`
  3. Add scripts:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```
  4. Run `npm run deploy`, then enable Pages in repo settings.

## Notes
- Tailwind is loaded via CDN in `index.html` to keep setup simple.
- Uses **framer-motion** for cute button animations.
