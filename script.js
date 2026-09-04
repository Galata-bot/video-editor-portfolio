/* =============================================================================
   SCRIPT.JS — Vanilla JS only. No frameworks, no build step.
   Reads the SITE_CONFIG, PROJECTS, and CATEGORIES globals defined in
   config.js and portfolio-data.js, which are loaded before this file.
   ============================================================================= */
(function(){
  "use strict";

  // config.js and portfolio-data.js declare SITE_CONFIG, PROJECTS, and
  // CATEGORIES with `const` at the top level of their own <script> tags.
  // Top-level `const`/`let` create global bindings but not `window`
  // properties, so they're read by their original names below rather than
  // via `window.` — this still works because all three <script> tags run
  // in the same global scope (none are modules). They're intentionally
  // NOT reassigned to same-named local variables here, since a `var` with
  // the same name inside this function would shadow the real global
  // thanks to hoisting.
  var CONFIG = SITE_CONFIG;
  var PROJECTS_LIST = PROJECTS;
  var CATEGORIES_LIST = CATEGORIES;

  /* ---------------------------------------------------------------------
     Small helpers
     --------------------------------------------------------------------- */
  function escapeHtml(str){
    return String(str == null ? "" : str).replace(/[&<>"']/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c];
    });
  }

  function extractVideoId(type, url){
    if(!url) return "";
    if(!/^https?:\/\//i.test(url)) return url.trim(); // already looks like a bare ID
    try{
      var u = new URL(url);
      if(type === "youtube"){
        if(u.hostname.indexOf("youtu.be") !== -1) return u.pathname.slice(1);
        if(u.searchParams.get("v")) return u.searchParams.get("v");
        var parts = u.pathname.split("/").filter(Boolean);
        return parts[parts.length - 1] || "";
      }
      if(type === "vimeo"){
        var vparts = u.pathname.split("/").filter(Boolean);
        return vparts[vparts.length - 1] || "";
      }
    }catch(e){ /* fall through */ }
    return url.trim();
  }

  /* ---------------------------------------------------------------------
     REUSABLE VIDEO COMPONENT
     Builds a lazy-loading media embed: shows a poster/thumbnail with a
     play button, and only loads the real video/iframe once the visitor
     clicks it. Falls back to a plain thumbnail when no video is set.
     --------------------------------------------------------------------- */
  function buildMediaEmbed(project, options){
    options = options || {};
    var orientation = project.orientation === "horizontal" ? "horizontal" : "vertical";
    var extraClass = options.extraClass ? " " + options.extraClass : "";

    var wrap = document.createElement("div");
    wrap.className = "media-embed media-embed--" + orientation + extraClass;

    var hasVideo = !!(project.videoType && project.videoUrl);

    if(!hasVideo){
      wrap.classList.add("media-embed--static");
      var staticInner = document.createElement("div");
      staticInner.className = "media-static";
      if(project.thumbnail){
        var img = document.createElement("img");
        img.src = project.thumbnail;
        img.loading = "lazy";
        img.alt = project.title ? (project.title + " — thumbnail") : "Project thumbnail";
        staticInner.appendChild(img);
      } else {
        var fallback = document.createElement("span");
        fallback.className = "media-poster-fallback";
        fallback.textContent = project.title || "Add a thumbnail or video";
        staticInner.appendChild(fallback);
      }
      wrap.appendChild(staticInner);
      return wrap;
    }

    var posterBtn = document.createElement("button");
    posterBtn.type = "button";
    posterBtn.className = "media-poster";
    posterBtn.setAttribute("aria-label", "Play video: " + (project.title || "project"));

    if(project.thumbnail){
      var pimg = document.createElement("img");
      pimg.src = project.thumbnail;
      pimg.loading = "lazy";
      pimg.alt = "";
      posterBtn.appendChild(pimg);
    } else {
      var pfallback = document.createElement("span");
      pfallback.className = "media-poster-fallback";
      pfallback.textContent = project.title || "Play video";
      posterBtn.appendChild(pfallback);
    }

    var playDot = document.createElement("span");
    playDot.className = "media-play";
    playDot.innerHTML = '<svg viewBox="0 0 24 24" class="icon-play" aria-hidden="true"><path d="M9 7l8 5-8 5z"/></svg>';
    posterBtn.appendChild(playDot);

    posterBtn.addEventListener("click", function(){ loadRealMedia(wrap, project); });
    wrap.appendChild(posterBtn);
    return wrap;
  }

  function loadRealMedia(wrap, project){
    wrap.innerHTML = "";
    wrap.classList.add("media-embed--active");
    var el;

    if(project.videoType === "mp4"){
      el = document.createElement("video");
      el.src = project.videoUrl;
      el.controls = true;
      el.autoplay = true;
      el.playsInline = true;
      el.className = "media-video";
      if(project.thumbnail) el.poster = project.thumbnail;
    } else {
      var id = extractVideoId(project.videoType, project.videoUrl);
      var src = "";
      if(project.videoType === "youtube"){
        src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      } else if(project.videoType === "vimeo"){
        src = "https://player.vimeo.com/video/" + encodeURIComponent(id) + "?autoplay=1";
      }
      el = document.createElement("iframe");
      el.src = src;
      el.title = project.title || "Video";
      el.className = "media-iframe";
      el.setAttribute("allow", "autoplay; fullscreen; picture-in-picture; clipboard-write");
      el.allowFullscreen = true;
      el.loading = "lazy";
      el.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    }

    wrap.appendChild(el);
    if(typeof el.focus === "function") el.focus();
  }

  /* ---------------------------------------------------------------------
     PORTFOLIO GRID + FILTERING
     --------------------------------------------------------------------- */
  var filterTabsEl = document.getElementById("filterTabs");
  var grid = document.getElementById("workGrid");
  var loadMoreBtn = document.getElementById("loadMoreBtn");
  var PAGE_SIZE = 6;
  var visibleCount = PAGE_SIZE;
  var activeFilter = "all";

  function projectsForFilter(key){
    if(key === "all") return PROJECTS_LIST;
    var cat = CATEGORIES_LIST.find(function(c){ return c.key === key; });
    if(!cat || !cat.match) return PROJECTS_LIST;
    return PROJECTS_LIST.filter(function(p){ return p.category === cat.match; });
  }

  function renderFilterTabs(){
    if(!filterTabsEl) return;
    filterTabsEl.innerHTML = "";
    CATEGORIES_LIST.forEach(function(cat){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-tab";
      btn.textContent = cat.label;
      btn.dataset.key = cat.key;
      btn.setAttribute("aria-pressed", cat.key === activeFilter ? "true" : "false");
      btn.addEventListener("click", function(){
        activeFilter = cat.key;
        visibleCount = PAGE_SIZE;
        renderFilterTabs();
        renderGrid();
      });
      filterTabsEl.appendChild(btn);
    });
  }

  function renderGrid(){
    if(!grid) return;
    grid.innerHTML = "";
    var filtered = projectsForFilter(activeFilter);

    if(!filtered.length){
      var empty = document.createElement("div");
      empty.className = "work-empty";
      empty.textContent = "No projects in this category yet.";
      grid.appendChild(empty);
      if(loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }

    filtered.slice(0, visibleCount).forEach(function(p){
      var card = document.createElement("a");
      card.href = "#/work/" + encodeURIComponent(p.id);
      card.className = "work-card reveal in";
      card.dataset.id = p.id;

      var frame = document.createElement("div");
      frame.className = "frame";

      if(p.featured){
        var flag = document.createElement("div");
        flag.className = "featured-flag";
        flag.textContent = "Featured";
        frame.appendChild(flag);
      }

      if(p.thumbnail){
        var img = document.createElement("img");
        img.src = p.thumbnail;
        img.loading = "lazy";
        img.alt = p.title ? (p.title + " thumbnail") : "Project thumbnail";
        frame.appendChild(img);
      } else {
        var titleMark = document.createElement("div");
        titleMark.className = "title-mark";
        titleMark.textContent = p.title || "Untitled project";
        frame.appendChild(titleMark);
      }

      var playDot = document.createElement("div");
      playDot.className = "play-dot";
      playDot.innerHTML = '<span><svg viewBox="0 0 24 24" class="icon-play" aria-hidden="true"><path d="M9 7l8 5-8 5z"/></svg></span>';
      frame.appendChild(playDot);

      var meta = document.createElement("div");
      meta.className = "work-meta";
      meta.innerHTML =
        "<h3>" + escapeHtml(p.title || "Untitled project") + "</h3>" +
        '<div class="meta-line"><span>' + escapeHtml(p.duration || "") + "</span><span>&middot;</span><span>" + escapeHtml(p.category || "") + "</span></div>";

      card.appendChild(frame);
      card.appendChild(meta);
      grid.appendChild(card);
    });

    if(loadMoreBtn){
      loadMoreBtn.style.display = visibleCount >= filtered.length ? "none" : "inline-flex";
    }
  }

  if(loadMoreBtn){
    loadMoreBtn.addEventListener("click", function(e){
      e.preventDefault();
      visibleCount += PAGE_SIZE;
      renderGrid();
    });
  }

  renderFilterTabs();
  renderGrid();
  /* ---------------------------------------------------------------------
     HERO REEL CLUSTER
     Pulls up to 3 projects — featured ones first — and links each frame
     straight to that project's detail page. Set "featured": true on
     projects in portfolio-data.js to control which ones show up here.
     --------------------------------------------------------------------- */
   /* ---------------------------------------------------------------------
     HERO AD REEL
     Reads from the ADS array in ads-data.js — completely separate from
     your portfolio projects. Each clip autoplays muted and loops; the
     frames are decorative and not clickable. Respects
     prefers-reduced-motion by showing a static poster instead of
     autoplaying for visitors who've asked for reduced motion.
     --------------------------------------------------------------------- */
  function buildAdFrame(ad, isBig){
    var wrap = document.createElement("div");
    wrap.className = "reel-frame" + (isBig ? " big" : "");
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", (ad && ad.label) || "Advertisement preview");

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasVideo = ad && ad.videoType && ad.videoUrl;

    if(!hasVideo || reduceMotion){
      if(ad && ad.poster){
        var img = document.createElement("img");
        img.src = ad.poster;
        img.alt = "";
        wrap.appendChild(img);
      }
      return wrap;
    }

    if(ad.videoType === "mp4"){
      var video = document.createElement("video");
      video.src = ad.videoUrl;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      if(ad.poster) video.poster = ad.poster;
      video.className = "reel-video";
      wrap.appendChild(video);
    } else {
      var id = extractVideoId(ad.videoType, ad.videoUrl);
      var src = "";
      if(ad.videoType === "youtube"){
        src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
          "?autoplay=1&mute=1&loop=1&playlist=" + encodeURIComponent(id) +
          "&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";
      } else if(ad.videoType === "vimeo"){
        src = "https://player.vimeo.com/video/" + encodeURIComponent(id) +
          "?autoplay=1&muted=1&loop=1&background=1";
      }
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.className = "reel-video";
      iframe.title = (ad && ad.label) || "Advertisement preview";
      iframe.setAttribute("allow", "autoplay; fullscreen");
      iframe.setAttribute("tabindex", "-1");
      wrap.appendChild(iframe);
    }
    return wrap;
  }

  function renderHeroReel(){
    var heroReel = document.getElementById("heroReel");
    if(!heroReel) return;
    var list = (typeof ADS !== "undefined" ? ADS : []).slice(0, 3);
    heroReel.innerHTML = "";
    list.forEach(function(ad, i){
      heroReel.appendChild(buildAdFrame(ad, i === 1));
    });
  }
  renderHeroReel();
  /* ---------------------------------------------------------------------
     PROJECT DETAIL VIEW + HASH ROUTING
     --------------------------------------------------------------------- */
  var homeView = document.getElementById("home-view");
  var detailView = document.getElementById("project-view");
  var detailVideoWrap = document.getElementById("detailVideoWrap");

  function findProject(id){ return PROJECTS_LIST.find(function(p){ return p.id === id; }); }
  function findIndex(id){ return PROJECTS_LIST.findIndex(function(p){ return p.id === id; }); }

  function setField(id, value, wrapperSelector){
    var el = document.getElementById(id);
    if(!el) return;
    el.textContent = value || "";
    if(wrapperSelector){
      var wrapper = el.closest(wrapperSelector);
      if(wrapper) wrapper.classList.toggle("detail-field--empty", !value);
    }
  }

  function openProject(id){
    var p = findProject(id);
    if(!p){
      closeProject();
      return;
    }

    document.getElementById("detailCategory").innerHTML = '<span class="rule"></span>' + escapeHtml(p.category || "");
    document.getElementById("detailTitle").textContent = p.title || "Untitled project";

    var metaBits = [];
    if(p.duration) metaBits.push("<span>" + escapeHtml(p.duration) + "</span>");
    if(p.platform) metaBits.push("<span>" + escapeHtml(p.platform) + "</span>");
    if(p.client) metaBits.push("<span>" + escapeHtml(p.client) + "</span>");
    if(p.date) metaBits.push("<span>" + escapeHtml(p.date) + "</span>");
    document.getElementById("detailMeta").innerHTML = metaBits.join("");

    setField("detailDescription", p.description, ".detail-field");
    setField("detailApproach", p.approach, ".detail-field");
    setField("detailPlatform", p.platform, ".detail-field");
    setField("detailServices", p.services, ".detail-field");
    setField("detailObjective", p.objective, ".detail-field");

    if(detailVideoWrap){
      detailVideoWrap.innerHTML = "";
      detailVideoWrap.appendChild(buildMediaEmbed(p, {}));
    }

    // Prev / next navigation, based on full project order
    var idx = findIndex(id);
    var prev = idx > 0 ? PROJECTS_LIST[idx - 1] : null;
    var next = idx >= 0 && idx < PROJECTS_LIST.length - 1 ? PROJECTS_LIST[idx + 1] : null;
    var prevLink = document.getElementById("detailPrev");
    var nextLink = document.getElementById("detailNext");

    if(prev){
      prevLink.href = "#/work/" + encodeURIComponent(prev.id);
      prevLink.querySelector(".t").textContent = prev.title || "Untitled project";
      prevLink.style.visibility = "visible";
    } else {
      prevLink.style.visibility = "hidden";
    }
    if(next){
      nextLink.href = "#/work/" + encodeURIComponent(next.id);
      nextLink.querySelector(".t").textContent = next.title || "Untitled project";
      nextLink.style.visibility = "visible";
    } else {
      nextLink.style.visibility = "hidden";
    }

    homeView.style.display = "none";
    detailView.classList.add("open");
    document.title = (p.title ? p.title + " — " : "") + CONFIG.name;
    window.scrollTo(0, 0);
  }

  function closeProject(){
    homeView.style.display = "";
    detailView.classList.remove("open");
    document.title = CONFIG.name + (CONFIG.title ? " | " + CONFIG.title : "");
  }

  function routeFromHash(){
    var match = location.hash.match(/^#\/work\/(.+)$/);
    if(match){ openProject(decodeURIComponent(match[1])); }
    else { closeProject(); }
  }
  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();

  var detailBack = document.getElementById("detailBack");
  if(detailBack){
    detailBack.addEventListener("click", function(e){
      e.preventDefault();
      location.hash = "#work";
    });
  }

  /* ---------------------------------------------------------------------
     NAV: scroll state + mobile menu
     --------------------------------------------------------------------- */
  var nav = document.getElementById("siteNav");
  function onScroll(){ nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var hamburger = document.getElementById("hamburger");
  var mobilePanel = document.getElementById("mobilePanel");
  hamburger.addEventListener("click", function(){
    var open = mobilePanel.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobilePanel.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      mobilePanel.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal:not(.in)");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: .15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------------------------------------------------------------------
     SHOWREEL (config-driven)
     --------------------------------------------------------------------- */
  var showreelWrap = document.getElementById("showreelWrap");
  if(showreelWrap){
    var reel = CONFIG.showreel || {};
    if(reel.type && reel.url){
      showreelWrap.innerHTML = "";
      var reelProject = {
        title: "Showreel",
        thumbnail: reel.poster || "",
        videoType: reel.type,
        videoUrl: reel.url,
        orientation: reel.orientation === "vertical" ? "vertical" : "horizontal"
      };
      showreelWrap.appendChild(buildMediaEmbed(reelProject, { extraClass: "showreel-wrap" }));
    }
    // If no showreel is configured, the static placeholder already in the
    // HTML is left as-is — nothing to do here.
  }

  /* ---------------------------------------------------------------------
     CONTACT FORM — Netlify Forms compatible (AJAX submit, no page reload)
     --------------------------------------------------------------------- */
  var contactForm = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  function showFormStatus(message, kind){
    if(!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = "form-status is-visible " + (kind === "error" ? "is-error" : "is-success");
  }

  function encodeFormData(form){
    var data = new FormData(form);
    var params = new URLSearchParams();
    data.forEach(function(value, key){ params.append(key, value); });
    return params.toString();
  }

  if(contactForm){
    contactForm.addEventListener("submit", function(e){
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if(submitBtn) submitBtn.disabled = true;

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(contactForm)
      }).then(function(res){
        if(res.ok){
          showFormStatus("Thanks — your message has been sent. I'll get back to you soon.", "success");
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      }).catch(function(){
        // Fall back to a normal (non-AJAX) form submission, which still
        // works with Netlify Forms once the site is deployed.
        showFormStatus("Sending the normal way — one moment...", "success");
        contactForm.submit();
      }).finally(function(){
        if(submitBtn) submitBtn.disabled = false;
      });
    });
  }

  /* ---------------------------------------------------------------------
     DIRECT CONTACT + FOOTER SOCIAL (config-driven, hides empty links)
     --------------------------------------------------------------------- */
  var directContact = document.getElementById("directContact");
  var footerSocial = document.getElementById("footerSocial");

  var directLinks = [];
  if(CONFIG.email){
    directLinks.push({ full: "Email Me", short: "Email", href: "mailto:" + CONFIG.email });
  }
  if(CONFIG.whatsapp){
    var waMsg = encodeURIComponent(CONFIG.whatsappMessage || "");
    directLinks.push({ full: "Message on WhatsApp", short: "WhatsApp", href: "https://wa.me/" + CONFIG.whatsapp + (waMsg ? "?text=" + waMsg : "") });
  }
  if(CONFIG.linkedin){
    directLinks.push({ full: "Connect on LinkedIn", short: "LinkedIn", href: CONFIG.linkedin });
  }
  if(CONFIG.youtube){
    directLinks.push({ full: "Watch on YouTube", short: "YouTube", href: CONFIG.youtube });
  }
  if(CONFIG.instagram){
    directLinks.push({ full: "Follow on Instagram", short: "Instagram", href: CONFIG.instagram });
  }

  if(directLinks.length){
    directLinks.forEach(function(l){
      var a = document.createElement("a");
      a.href = l.href; a.textContent = l.full; a.target = "_blank"; a.rel = "noopener";
      if(directContact) directContact.appendChild(a);

      var fa = document.createElement("a");
      fa.href = l.href; fa.textContent = l.short; fa.target = "_blank"; fa.rel = "noopener";
      if(footerSocial) footerSocial.appendChild(fa);
    });
  } else if(directContact){
    directContact.innerHTML = '<p class="empty-note">Add your email, WhatsApp number, or social links in config.js to show direct contact buttons here.</p>';
  }

  /* ---------------------------------------------------------------------
     FOOTER YEAR + NAME
     --------------------------------------------------------------------- */
  var footerCopy = document.getElementById("footerCopy");
  if(footerCopy){
    footerCopy.textContent = "\u00A9 " + new Date().getFullYear() + " " + CONFIG.name + ". All rights reserved.";
  }

})();
