If you're self-hosting any video files (rather than linking to YouTube or
Vimeo), put the .mp4 files in this folder.

Then reference them in portfolio-data.js under a project's "videoUrl" field,
e.g. "assets/videos/project-01.mp4", with "videoType" set to "mp4".

Note: GitHub has a 100MB per-file limit and Netlify has repository size
limits, so for anything longer than a short clip, YouTube or Vimeo hosting
(with "videoType": "youtube" or "vimeo") is usually the better option —
it's free, has no size limit, and loads faster for visitors.
