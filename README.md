# Construction Estimation Master Toolkit — Landing Page

Plain static site (`index.html`, `styles.css`, `script.js`, `config.js`). No framework, no build step.

## 1. Fill in `config.js`

Every link, image, price and brand value lives in `config.js` — you never need to edit the HTML.

| Key | What to put | If left empty |
|---|---|---|
| `BUY_LINK` | Your SuperProfile checkout URL. Used by **every** buy button. | Buttons stay on `#` and a console warning is logged |
| `BRAND_NAME` | Your brand name (header, footer, copyright) | Brand text is hidden |
| `CONTACT_EMAIL` / `CONTACT_PHONE` | Shown in the footer as `mailto:` / `tel:` links | Hidden |
| `TERMS_LINK` / `REFUND_LINK` / `PRIVACY_LINK` | Full URLs to your policy pages | Hidden |
| `META_PIXEL_ID` | Optional Meta Pixel ID (numbers only) | No tracking code is loaded |
| `PRICE` / `MRP` | e.g. `"₹249"` / `"₹999"` — filled in everywhere on the page | — |
| `IMAGES.*` | Full image URLs (https://…) | A dashed placeholder with the slot name is shown |

Paste an image URL and the image appears automatically in that slot — no other change needed.

**Meta Pixel events** (only when `META_PIXEL_ID` is set): `PageView` on load, `ViewContent` once when "What's Inside" scrolls into view, `InitiateCheckout` (value from `PRICE`, currency INR) on every buy-button click.

## 2. Recommended image sizes

| Slot | Size | Ratio |
|---|---|---|
| `HERO_MOCKUP` | 1080 × 1350 | 4:5 |
| `BOQ_COURSE`, `QS_GUIDE`, `BILLING`, `RATE_ANALYSIS`, `BBS`, `EXCEL_SHEETS` | 1080 × 1080 | 1:1 |
| `OG_IMAGE` | 1200 × 630 | 1.91:1 |
| `LOGO` | 512 × 512 | square |
| `FAVICON` | 512 × 512 PNG (or .ico / .svg) | square |

Use WebP or compressed JPG (ideally under 200 KB each) for best Lighthouse scores. Images that don't match the ratio are cropped to fill the frame.

## 3. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repo.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**. Every later push to the repo redeploys automatically.

Or with the CLI: `npm i -g vercel` then run `vercel --prod` in this folder.

### Caching notes
- `config.js` and the page are never cached long, so link/price changes show up right after redeploy.
- `styles.css` and `script.js` are cached for a year. If you edit either file, bump the version in `index.html` (`styles.css?v=1` → `?v=2`, `script.js?v=1` → `?v=2`) so visitors get the new file.

### Social previews
Facebook/WhatsApp/LinkedIn crawlers don't run JavaScript, so for reliable link previews also paste your `OG_IMAGE` URL directly into the empty `content=""` of the `og:image` and `twitter:image` meta tags in `index.html`.

## Local preview
Open `index.html` directly in a browser, or run `npx serve .` in this folder.
