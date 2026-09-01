/* =============================================================================
   SITE CONFIGURATION
   =============================================================================
   This is the ONLY file you need to edit to update your name, contact
   details, social links, and showreel across the entire website.

   RULE: leave any field as an empty string "" if you don't have that
   information yet. Anything left empty is automatically hidden from the
   site (no broken links, no fake buttons) — you never need to touch
   index.html, style.css or script.js to do this.
   ============================================================================= */

const SITE_CONFIG = {

  // Your name — shown in the nav mark, footer, and browser tab title.
  name: "Galata Mangistu",

  // Short professional title — shown in the browser tab and meta description.
  // Example: "Short-Form Video Editor"
  title: "Video Editor",

  // ---------------------------------------------------------------------
  // DIRECT CONTACT
  // ---------------------------------------------------------------------

  // Your real email address. Leave empty to hide the "Email Me" button.
  // Example: "hello@example.com"
  email: "qophaatti@gmail.com",

  // Your WhatsApp number in international format, DIGITS ONLY —
  // no "+", no spaces, no dashes. Leave empty to hide the WhatsApp button.
  // Example: "251912345678"
  whatsapp: "+251947284124",

  // Message that's pre-filled when someone taps the WhatsApp button.
  // Change or shorten this however you like.
  whatsappMessage: "Hello, I found your portfolio and would like to discuss a video editing project.",

  // Full profile URLs. Leave any of these empty to hide that icon/button.
  linkedin: "linkedin.com/in/galata-mangistu-2a9a12339",
  instagram: "@galata5044",
  youtube: "",

  // ---------------------------------------------------------------------
  // SHOWREEL
  // ---------------------------------------------------------------------
  // type: "mp4" | "youtube" | "vimeo" | ""  (leave "" if you have no reel yet)
  // url:  for "mp4"     → path to your file, e.g. "assets/videos/showreel.mp4"
  //       for "youtube" → the video ID (e.g. "dQw4w9WgXcQ") or a full URL
  //       for "vimeo"   → the video ID (e.g. "76979871") or a full URL
  // poster: path to a thumbnail image shown before the reel is played,
  //         e.g. "assets/images/showreel-poster.jpg"
  // orientation: "horizontal" (16:9, most showreels) or "vertical" (9:16)
  showreel: {
    type: "",
    url: "",
    poster: "",
    orientation: "horizontal"
  },

  // ---------------------------------------------------------------------
  // SEO
  // ---------------------------------------------------------------------

  // Your real, final deployed site URL — fill this in once you know your
  // Netlify subdomain or custom domain (e.g. "https://galata-editor.netlify.app").
  // Used for the canonical link and Open Graph tags. Leave empty until then.
  siteUrl: "",

  // Path or URL to a social preview image, ideally 1200x630px,
  // e.g. "assets/images/social-preview.jpg"
  socialImage: ""
};
