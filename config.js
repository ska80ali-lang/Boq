/*
 * SITE CONFIG — the single place for every link, image, price and brand value.
 * Paste your URLs between the quotes. Empty values are handled gracefully:
 *  - empty BUY_LINK      → buttons stay on "#" (console warning)
 *  - empty image URL     → a labelled placeholder is shown in its place
 *  - empty brand/contact/policy values → those elements are hidden
 *  - empty META_PIXEL_ID → no tracking script is loaded
 */
window.SITE_CONFIG = {
  BUY_LINK: "",              // SuperProfile checkout link — used by EVERY buy button
  BRAND_NAME: "",
  CONTACT_EMAIL: "",
  CONTACT_PHONE: "",
  TERMS_LINK: "",
  REFUND_LINK: "",
  PRIVACY_LINK: "",
  META_PIXEL_ID: "",         // optional
  PRICE: "₹249",
  MRP: "₹999",
  IMAGES: {
    LOGO: "",
    HERO_MOCKUP: "",         // main product image (4:5)
    BOQ_COURSE: "",
    QS_GUIDE: "",
    BILLING: "",
    RATE_ANALYSIS: "",
    BBS: "",
    EXCEL_SHEETS: "",
    OG_IMAGE: "",
    FAVICON: ""
  }
};
