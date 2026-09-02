/* =============================================================================
   HERO AD REEL
   =============================================================================
   These are the 3 clips that autoplay, muted, on loop, in the hero section
   at the very top of the site. They are completely separate from your
   portfolio projects in portfolio-data.js — edit ONLY this file to change
   what plays in the hero.

   Each entry needs:
     videoType : "mp4" | "youtube" | "vimeo" | "" (leave "" for no video yet)
     videoUrl  : for "mp4"     → path to your file, e.g. "assets/videos/ad-01.mp4"
                 for "youtube" → the video ID (e.g. "dQw4w9WgXcQ") or full URL
                 for "vimeo"   → the video ID (e.g. "76979871") or full URL
     poster    : image shown before the video loads, and as the fallback if
                 no video is set — e.g. "assets/images/ad-01-poster.jpg"
     label     : screen-reader-only description — visitors never see this
                 text, it's just for accessibility

   IMPORTANT: these autoplay the instant the page loads, so keep clips
   SHORT (a few seconds) and well-compressed (small file size), especially
   for "mp4" — large files here will slow down the whole site's first load.

   Order matters: the FIRST and THIRD entries render small (the side
   frames), the SECOND entry renders large (the center frame) — matching
   the original three-frame hero layout.
   ============================================================================= */

const ADS = [
  {
    id: "ad-1",
    label: "Ad reel — clip 1",
    videoType: "mp4",              // "mp4" | "youtube" | "vimeo" | ""
    videoUrl: "assets/videos/ads1.mp4",
    poster: ""                  // e.g. "assets/images/ad-01-poster.jpg"
  },
  {
    id: "ad-2",
    label: "Ad reel — clip 2 (featured, center)",
    videoType: "mp4",              // "mp4" | "youtube" | "vimeo" | ""
    videoUrl: "assets/videos/ads-01.mp4",
    poster: ""
  },
  {
    id: "ad-3",
    label: "Ad reel — clip 3",
    videoType: "mp4",              // "mp4" | "youtube" | "vimeo" | ""
    videoUrl: "assets/videos/ads1.mp4",
    poster: ""
  }
];
