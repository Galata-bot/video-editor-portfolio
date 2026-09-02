/* =============================================================================
   PORTFOLIO PROJECTS
   =============================================================================
   This file is the ONLY place you need to edit to manage your portfolio.
   You never need to touch index.html or script.js to add, edit, reorder,
   or remove a project — the grid, filters, and project pages all update
   automatically from the PROJECTS array below.

   -----------------------------------------------------------------------
   HOW TO ADD A NEW PROJECT
   -----------------------------------------------------------------------
   1. Copy one entire project object below, from its opening "{" to the
      closing "}," that follows it.
   2. Paste the copy anywhere inside the PROJECTS array.
   3. Give it a unique "id" — no two projects may share the same id.
   4. Fill in the fields described below. Anything left as "" is simply
      not shown on the site.

   -----------------------------------------------------------------------
   HOW TO REPLACE A VIDEO
   -----------------------------------------------------------------------
   Set "videoType" and "videoUrl" on that project:
     videoType: "mp4"      videoUrl: "assets/videos/your-file.mp4"
     videoType: "youtube"  videoUrl: "dQw4w9WgXcQ"   (video ID or full URL)
     videoType: "vimeo"    videoUrl: "76979871"       (video ID or full URL)
     videoType: ""         (no video yet — the thumbnail is shown instead,
                             with no play button, so nothing looks broken)

   -----------------------------------------------------------------------
   HOW TO REPLACE A THUMBNAIL
   -----------------------------------------------------------------------
   Set "thumbnail" to the path of your image, for example:
     thumbnail: "assets/images/project-01.jpg"
   Put the actual image file in the assets/images/ folder first.
   Leave "thumbnail" as "" to show a plain placeholder frame instead.

   -----------------------------------------------------------------------
   HOW TO DELETE A PROJECT
   -----------------------------------------------------------------------
   Delete its entire { ... } object, including the comma that follows it,
   from the PROJECTS array below.

   -----------------------------------------------------------------------
   HOW TO CHANGE THE PROJECT ORDER
   -----------------------------------------------------------------------
   Projects appear on the site in the same order they're listed in this
   file. Cut and paste an object to a new position in the array to
   reorder it. The "featured" project badge is separate from order —
   set "featured: true" on any project regardless of its position.

   -----------------------------------------------------------------------
   HOW TO CHANGE OR ADD CATEGORIES
   -----------------------------------------------------------------------
   Filter categories live in CATEGORIES, just below. "label" is the text
   shown on the filter button, and "match" is the exact text a project's
   "category" field must contain to appear under that filter. To add a
   new filterable category, add an entry here and use the same "match"
   text in a project's "category" field. Projects whose category is
   "Other" (or doesn't match any filter) will still appear under "All".
   ============================================================================= */

const CATEGORIES = [
  { key: "all",          label: "All",          match: null },
  { key: "short-form",   label: "Short-Form",    match: "Short-Form" },
  { key: "talking-head", label: "Talking Head",  match: "Talking Head" },
  { key: "ads",          label: "Ads",           match: "Social Media Ads" },
  { key: "educational",  label: "Educational",   match: "Educational" },
  { key: "promotional",  label: "Promotional",   match: "Promotional" },
  { key: "youtube",      label: "YouTube",       match: "YouTube" },
  { key: "short-film",   label: "Short Film",    match: "Short Film" }
];

const PROJECTS = [
  {
    id: "01",
    title: "Self promotion",
    category: "16:9",              // see CATEGORIES above — or use "Other"
    duration: "00:31",                   // shown as meta text (running time)
    platform: "TikTok, Instagram Reels, Youtube",
    services: "Editing, pacing, captions, sound design",
    featured: true,                      // true shows a "Featured" flag on the grid

    // Optional fields — leave as "" to hide them automatically.
    client: "",
    date: "",
    objective: "",

    description: "A self-initiated video editing project created to showcase my editing skills.",
    approach: "I focused on clean pacing and precise cuts to keep the 31-second edit engaging from start to finish. I used smooth, purposeful transitions where needed, balanced the audio with music and sound effects, and refined the timing of each shot to create a cohesive flow. The raw footage was shaped into a polished 16:9 showcase piece with a professional visual and audio finish.",

    thumbnail: "project-01.png",                       // e.g. "assets/images/project-01.jpg"

    videoType: "youtube",                       // "mp4" | "youtube" | "vimeo" | ""
    videoUrl: "https://youtu.be/PuICQMzOfCk?si=UJP36L5FXEWqiSHG",
    orientation: "horizontal"              // "vertical" (9:16) or "horizontal" (16:9)
  },
  {
    id: "02",
    title: "Product promotion",
    category: "Talking Head",
    duration: "01:34",
    platform: "YouTube Shorts, Instagram",
    services: "Cutting, captions, B-roll, motion raphics",
    featured: true,
    client: "",
    date: "",
    objective: "",
    description: "A self-initiated video editing project created to showcase my editing skills.",
    approach: "I focused on clean pacing and precise cuts to keep the 31-second edit engaging from start to finish. I used smooth, purposeful transitions where needed, balanced the audio with music and sound effects, and refined the timing of each shot to create a cohesive flow. The raw footage was shaped into a polished 16:9 showcase piece with a professional visual and audio finish.",
    thumbnail: "project-2.jpg",
    videoType: "youtube",
    videoUrl: "https://youtu.be/wkQgZcQKszY?si=GQKntinrZaAHb4RY",
    orientation: "vertical"
  },
  {
    id: "03",
    title: "Project Title",
    category: "Social Media Ads",
    duration: "00:15",
    platform: "Instagram Reels, Facebook Reels",
    services: "Editing, motion graphics, sound design",
    featured: false,
    client: "",
    date: "",
    objective: "",
    description: "Add your project description here.",
    approach: "Describe your editing approach here.",
    thumbnail: "",
    videoType: "",
    videoUrl: "",
    orientation: "vertical"
  },
  {
    id: "04",
    title: "Project Title",
    category: "Educational",
    duration: "01:12",
    platform: "YouTube Shorts",
    services: "Editing, captions, pacing",
    featured: false,
    client: "",
    date: "",
    objective: "",
    description: "Add your project description here.",
    approach: "Describe your editing approach here.",
    thumbnail: "",
    videoType: "",
    videoUrl: "",
    orientation: "vertical"
  },
  {
    id: "05",
    title: "Project Title",
    category: "Promotional",
    duration: "00:27",
    platform: "TikTok, Instagram Reels",
    services: "Editing, color grading, sound design",
    featured: true,
    client: "",
    date: "",
    objective: "",
    description: "Add your project description here.",
    approach: "Describe your editing approach here.",
    thumbnail: "",
    videoType: "",
    videoUrl: "",
    orientation: "vertical"
  },
  {
    id: "06",
    title: "Project Title",
    category: "YouTube",
    duration: "08:40",
    platform: "YouTube",
    services: "Editing, sound design, color grading, motion graphics",
    featured: false,
    client: "",
    date: "",
    objective: "",
    description: "Add your project description here.",
    approach: "Describe your editing approach here.",
    thumbnail: "",
    videoType: "",
    videoUrl: "",
    orientation: "horizontal"
  },
  {
    id: "07",
    title: "Project Title",
    category: "Short Film",
    duration: "04:20",
    platform: "YouTube, Film Festival Submission",
    services: "Editing, color grading, sound design",
    featured: false,
    client: "",
    date: "",
    objective: "",
    description: "Add your project description here.",
    approach: "Describe your editing approach here.",
    thumbnail: "",
    videoType: "",
    videoUrl: "",
    orientation: "horizontal"
  }
];
