/*
 * SITE CONFIG — the single place for every link, image, price and brand value.
 * Paste your URLs between the quotes. Empty values are handled gracefully:
 *  - empty BUY_LINK      → buttons stay on "#" (console warning)
 *  - empty image URL     → a labelled placeholder is shown in its place
 *  - empty brand/contact/policy values → those elements are hidden
 *  - empty META_PIXEL_ID → no tracking script is loaded
 *
 * Images: the files in /images are compressed WebP copies of the original
 * uploads (≈1 MB total instead of ≈14.5 MB). Originals, if you ever need them:
 *  HERO_MOCKUP   https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--11_12_39-AM-2026-24-08-05-42-52.png
 *  BOQ_COURSE    https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_23_25-AM-2026-24-08-04-55-36.png
 *  QS_GUIDE      https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_23_46-AM-2026-24-08-04-56-52.png
 *  BILLING       https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_23_10-AM-2026-24-08-04-57-27.png
 *  RATE_ANALYSIS https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_22_40-AM-2026-24-08-05-24-12.png
 *  BBS           https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_22_44-AM-2026-24-08-05-25-25.png
 *  EXCEL_SHEETS  https://media-cdn.cosmofeed.com/chat/ChatGPT-Image-Aug-24--2026--09_23_05-AM-2026-24-08-05-25-48.png
 * Any full https:// image link also works here.
 */
window.SITE_CONFIG = {
  BUY_LINK: "",              // SuperProfile checkout link — used by EVERY buy button
  BRAND_NAME: "",
  CONTACT_EMAIL: "ska80ali@gmail.com",
  CONTACT_PHONE: "",         // left empty on purpose — phone is not shown
  TERMS_LINK: "/terms",
  REFUND_LINK: "/refund",
  PRIVACY_LINK: "/privacy",
  DELIVERY_LINK: "/delivery",
  DISCLAIMER_LINK: "/disclaimer",
  CONTACT_LINK: "/contact",
  META_PIXEL_ID: "",         // optional
  PRICE: "₹249",
  MRP: "₹999",
  IMAGES: {
    LOGO: "",
    HERO_MOCKUP: "images/hero.webp",           // 16:9 banner
    BOQ_COURSE: "images/boq-course.webp",
    QS_GUIDE: "images/qs-guide.webp",
    BILLING: "images/billing.webp",
    RATE_ANALYSIS: "images/rate-analysis.webp",
    BBS: "images/bbs.webp",
    EXCEL_SHEETS: "images/excel-sheets.webp",
    OG_IMAGE: "images/og-image.jpg",
    FAVICON: ""
  }
};
