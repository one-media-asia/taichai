# Tai Chi Week Planner (太极周计划)

Static PWA: 7-day Yang-style Tai Chi planner with step-by-step demos.

## Languages

- **English** and **Simplified Chinese (简体中文)**
- Default: browser language (`zh*` → `zh-CN`, otherwise `en`)
- Choice persisted in `localStorage` key `taiChiLang` (`en` | `zh-CN`)
- Toggle: header **EN | 中文**, and again under **Settings → Language**

Progress and day keys stay English internally (`Monday`…`Sunday`) so existing saved data keeps working.

## Install as app

- Chrome/Edge/Android: a slim top banner appears when install is available (**Install** / **Not now**). Settings also has **Install PWA**.
- iOS Safari: a tip to use Share → Add to Home Screen.
- Dismiss is remembered via `taiChiInstallBannerDismissed`.

## Deploy

Upload these files to the existing Vercel project for **taichi.onemedia.asia** (static hosting — open `index.html` / root as the site entry):

- `index.html`
- `app.js`
- `styles.css`
- `manifest.json`

No build step required.
