/*
 * SITE CONFIG — the single place for every link, image, price and brand value.
 * Paste your URLs between the quotes. Empty values are handled gracefully:
 *  - empty BUY_LINK      → buttons stay on "#" (console warning)
 *  - empty image URL     → a labelled placeholder is shown in its place
 *  - empty brand/contact/policy values → those elements are hidden
 *  - empty META_PIXEL_ID → no tracking script is loaded
 */
window.SITE_CONFIG = {
  BUY_LINK: "https://superprofile.bio/vp/construction-estimation-toolkit-?checkout=true",              // SuperProfile checkout link — used by EVERY buy button
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
  PRICE: "₹199",
  MRP: "₹999",
  IMAGES: {
    LOGO: "",
    HERO_MOCKUP: "images/hero-v2-1280.webp",          // 16:9 banner
    BOQ_COURSE: "images/boq-course-1200.webp",
    QS_GUIDE: "images/qs-guide-1200.webp",
    BILLING: "images/billing-1200.webp",
    RATE_ANALYSIS: "images/rate-analysis-1200.webp",
    BBS: "images/bbs-1200.webp",
    EXCEL_SHEETS: "images/excel-sheets-1200.webp",
    OG_IMAGE: "images/og-image-v2.jpg",
    FAVICON: ""
  },
  /*
   * Optional: smaller copies of the same image so phones download less.
   * If you paste a NEW link in IMAGES above, these are ignored automatically
   * for that slot (you can also delete its line here).
   */
  RESPONSIVE_IMAGES: {
    HERO_MOCKUP: "images/hero-v2-640.webp 640w, images/hero-v2-960.webp 960w, images/hero-v2-1280.webp 1280w",
    BOQ_COURSE: "images/boq-course-480.webp 480w, images/boq-course-800.webp 800w, images/boq-course-1200.webp 1200w",
    QS_GUIDE: "images/qs-guide-480.webp 480w, images/qs-guide-800.webp 800w, images/qs-guide-1200.webp 1200w",
    BILLING: "images/billing-480.webp 480w, images/billing-800.webp 800w, images/billing-1200.webp 1200w",
    RATE_ANALYSIS: "images/rate-analysis-480.webp 480w, images/rate-analysis-800.webp 800w, images/rate-analysis-1200.webp 1200w",
    BBS: "images/bbs-480.webp 480w, images/bbs-800.webp 800w, images/bbs-1200.webp 1200w",
    EXCEL_SHEETS: "images/excel-sheets-480.webp 480w, images/excel-sheets-800.webp 800w, images/excel-sheets-1200.webp 1200w"
  }
};
