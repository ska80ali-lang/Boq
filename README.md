# Construction Estimation Master Toolkit — Landing Page

Plain static site (`index.html`, `styles.css`, `script.js`, `config.js`). No framework, no build step.

## 1. Fill in `config.js`

Every link, image, price and brand value lives in `config.js` — you never need to edit the HTML.

| Key | What to put | If left empty |
|---|---|---|
| `BUY_LINK` | Your SuperProfile checkout URL. Used by **every** buy button. | Buttons stay on `#` and a console warning is logged |
| `BRAND_NAME` | Your brand name (header, footer, copyright) | Brand text is hidden |
| `CONTACT_EMAIL` / `CONTACT_PHONE` | Shown in the footer as `mailto:` / `tel:` links (phone is intentionally left empty) | Hidden |
| `TERMS_LINK` / `REFUND_LINK` / `PRIVACY_LINK` / `DELIVERY_LINK` / `DISCLAIMER_LINK` / `CONTACT_LINK` | Policy pages (built-in pages by default, or any full URL) | Hidden |
| `META_PIXEL_ID` | Optional Meta Pixel ID (numbers only) | No tracking code is loaded |
| `PRICE` / `MRP` | e.g. `"₹249"` / `"₹999"` — filled in everywhere on the page | — |
| `IMAGES.*` | Full image URLs (https://…) | A dashed placeholder with the slot name is shown |

Paste an image URL and the image appears automatically in that slot — no other change needed.

**Meta Pixel events** (only when `META_PIXEL_ID` is set): `PageView` on load, `ViewContent` once when "What's Inside" scrolls into view, `InitiateCheckout` (value from `PRICE`, currency INR) on every buy-button click.

## 2. Images

The product images are in `/images` as compressed WebP files, each in three widths. Phones automatically download a smaller copy (about 0.6 MB for the whole page, instead of 14.5 MB for the original PNGs). `config.js` → `IMAGES` holds the main file for each slot, and `RESPONSIVE_IMAGES` lists the smaller copies.

To change an image, paste a new full `https://` link (or a new file path) into its `IMAGES` slot. The old smaller copies are then ignored automatically for that slot.

| Slot | Recommended size | Ratio |
|---|---|---|
| `HERO_MOCKUP` | 1280 × 720 or larger | 16:9 (wide banner) |
| `BOQ_COURSE`, `QS_GUIDE`, `BILLING`, `RATE_ANALYSIS`, `BBS`, `EXCEL_SHEETS` | 1200 × 1110 (about 1080 × 1000) | 13:12, close to square |
| `OG_IMAGE` | 1200 × 630 | 1.91:1 |
| `LOGO` | 512 × 512 | square |
| `FAVICON` | 512 × 512 PNG (or .ico / .svg) | square |

Images with a different ratio are cropped to fill their frame.

## 3. Policy pages

`terms.html`, `privacy.html`, `refund.html`, `delivery.html`, `disclaimer.html` and `contact.html` are linked in the footer through `TERMS_LINK`, `PRIVACY_LINK`, `REFUND_LINK`, `DELIVERY_LINK`, `DISCLAIMER_LINK` and `CONTACT_LINK` in `config.js`. On Vercel they open at clean URLs (`/terms`, `/refund`, …). The contact email on these pages comes from `CONTACT_EMAIL`.

**Review them before going live.** In particular, the refund rules (refunds only for duplicate payments or access that was never delivered, requested within 7 days) and the 5–7 business day refund timeline are standard choices for a digital product. Change them if your policy is different.

## 4. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project →** import the repo.
3. Framework preset: **Other**. Leave Build Command and Output Directory empty.
4. Click **Deploy**. Every later push to the repo redeploys automatically.

Or with the CLI: `npm i -g vercel` then run `vercel --prod` in this folder.

### Caching notes
- `config.js` and the page are never cached long, so link/price changes show up right after redeploy.
- `styles.css` and `script.js` are cached for a year. If you edit either file, bump the version in `index.html` (`styles.css?v=1` → `?v=2`, `script.js?v=1` → `?v=2`) so visitors get the new file.

### Social previews
Facebook/WhatsApp/LinkedIn crawlers don't run JavaScript. Paste your `OG_IMAGE` link into the empty `content=""` of the `og:image` and `twitter:image` meta tags in `index.html` so link previews show the image.

## Local preview
Run `npx serve .` in this folder and open the address it prints. (Opening `index.html` directly also works for the main page, but the footer policy links need a server.)
