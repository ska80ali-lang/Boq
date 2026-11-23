/* =========================================================
   Construction Estimation Master Toolkit — behaviour
   Every value comes from window.SITE_CONFIG (config.js).
   ========================================================= */
(function () {
  'use strict';

  var C = window.SITE_CONFIG || {};
  var IMAGES = C.IMAGES || {};
  var doc = document;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function filled(v) { return typeof v === 'string' && v.trim() !== ''; }
  function toNumber(v) { var n = parseFloat(String(v || '').replace(/[^\d.]/g, '')); return isFinite(n) ? n : 0; }
  function val(key) { return filled(C[key]) ? C[key].trim() : ''; }

  /* ---------- Price / MRP / text values ---------- */
  function fillText() {
    $$('[data-price]').forEach(function (el) { el.textContent = val('PRICE'); });
    $$('[data-mrp]').forEach(function (el) { el.textContent = val('MRP'); });
    $$('[data-config]').forEach(function (el) { el.textContent = val(el.getAttribute('data-config')); });
    $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

    // Hide MRP strike-throughs if MRP is empty
    if (!val('MRP')) $$('.mrp').forEach(function (el) { el.hidden = true; });

    // "75% OFF" chip, calculated from PRICE and MRP
    var p = toNumber(C.PRICE), m = toNumber(C.MRP);
    var off = p > 0 && m > p ? Math.round((1 - p / m) * 100) : 0;
    $$('[data-discount]').forEach(function (el) {
      if (off > 0) el.textContent = off + '% OFF'; else el.hidden = true;
    });
  }

  /* ---------- Hide elements whose config value is empty ---------- */
  function applyVisibility() {
    $$('[data-requires]').forEach(function (el) {
      if (!val(el.getAttribute('data-requires'))) el.hidden = true;
    });
    $$('[data-requires-any]').forEach(function (el) {
      var keys = el.getAttribute('data-requires-any').split(/\s+/);
      if (!keys.some(function (k) { return val(k); })) el.hidden = true;
    });
  }

  /* ---------- Contact + policy links ---------- */
  function fillLinks() {
    $$('[data-mailto]').forEach(function (a) {
      var v = val(a.getAttribute('data-mailto'));
      if (v) a.href = 'mailto:' + v;
    });
    $$('[data-tel]').forEach(function (a) {
      var v = val(a.getAttribute('data-tel'));
      if (v) a.href = 'tel:' + v.replace(/[^\d+]/g, '');
    });
    $$('[data-link]').forEach(function (a) {
      var v = val(a.getAttribute('data-link'));
      if (v) {
        a.href = v;
        // external policy pages open in a new tab; pages on this site open normally
        if (/^https?:\/\//i.test(v) && a.host !== location.host) {
          a.target = '_blank';
          a.rel = 'noopener';
        }
        if (location.pathname.replace(/\.html$/, '') === v.replace(/\.html$/, '')) a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- Image slots ---------- */
  function placeholder(slot, note) {
    var div = doc.createElement('div');
    div.className = 'placeholder';
    var isLogo = slot === 'LOGO';
    if (isLogo) {
      div.textContent = 'LOGO';
      div.title = 'LOGO — add image link in config.js';
    } else {
      var s = doc.createElement('strong');
      s.textContent = slot;
      div.appendChild(s);
      div.appendChild(doc.createTextNode(note || '— add image link in config.js'));
    }
    div.setAttribute('role', 'img');
    div.setAttribute('aria-label', 'Image placeholder: ' + slot);
    return div;
  }

  function fillImages() {
    $$('[data-slot]').forEach(function (box) {
      var slot = box.getAttribute('data-slot');
      var src = filled(IMAGES[slot]) ? IMAGES[slot].trim() : '';
      box.innerHTML = '';

      if (!src) {
        // optional slots (e.g. footer logo) simply disappear when empty
        if (box.hasAttribute('data-optional')) { box.hidden = true; return; }
        box.appendChild(placeholder(slot));
        return;
      }

      var img = doc.createElement('img');
      var eager = box.hasAttribute('data-eager');
      img.alt = box.getAttribute('data-alt') || '';
      img.decoding = 'async';
      img.loading = eager ? 'eager' : 'lazy';
      if (slot === 'HERO_MOCKUP') img.setAttribute('fetchpriority', 'high');
      // optional smaller versions for phones (only used if they belong to the same image)
      var set = (C.RESPONSIVE_IMAGES || {})[slot];
      if (filled(set) && set.indexOf(src) !== -1) {
        img.sizes = box.getAttribute('data-sizes') || '100vw';
        img.srcset = set.trim();
      }
      var w = box.getAttribute('data-w'), h = box.getAttribute('data-h');
      if (w && h) { img.width = +w; img.height = +h; }
      else if (slot === 'LOGO') { img.width = 80; img.height = 80; }
      img.addEventListener('error', function () {
        box.innerHTML = '';
        box.appendChild(placeholder(slot, '— image link could not be loaded, check config.js'));
      });
      img.src = src;
      box.appendChild(img);
    });
  }

  /* ---------- Head: favicon + social image ---------- */
  function fillHead() {
    var fav = IMAGES.FAVICON;
    if (filled(fav)) {
      var link = doc.createElement('link');
      link.rel = 'icon';
      link.href = fav.trim();
      doc.head.appendChild(link);
      var apple = doc.createElement('link');
      apple.rel = 'apple-touch-icon';
      apple.href = fav.trim();
      doc.head.appendChild(apple);
    }
    var og = IMAGES.OG_IMAGE;
    // social crawlers need an absolute URL
    if (filled(og)) { try { og = new URL(og.trim(), location.href).href; } catch (err) { /* keep as-is */ } }
    // Fill from config; if config is empty, keep any value hardcoded in HTML, else drop the empty tag.
    var setMeta = function (sel, content) {
      var m = doc.querySelector(sel);
      if (!m) return;
      if (content) m.setAttribute('content', content);
      else if (!filled(m.getAttribute('content'))) m.parentNode.removeChild(m);
    };
    setMeta('meta[property="og:image"]', filled(og) ? og.trim() : '');
    setMeta('meta[name="twitter:image"]', filled(og) ? og.trim() : '');
    if (!doc.querySelector('meta[property="og:image"]')) {
      setMeta('meta[property="og:image:width"]', '');
      setMeta('meta[property="og:image:height"]', '');
    }
    setMeta('meta[property="og:url"]', location.href.split('#')[0]);
    if (val('BRAND_NAME')) {
      var site = doc.createElement('meta');
      site.setAttribute('property', 'og:site_name');
      site.setAttribute('content', val('BRAND_NAME'));
      doc.head.appendChild(site);
    }
  }

  /* ---------- Meta Pixel ---------- */
  function priceValue() {
    return toNumber(C.PRICE) || 249;
  }

  function loadPixel() {
    var id = val('META_PIXEL_ID');
    if (!id) return false;
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, doc, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', id);
    window.fbq('track', 'PageView');

    var inside = doc.getElementById('inside');
    if (inside && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          window.fbq('track', 'ViewContent', {
            content_name: 'Construction Estimation Master Toolkit',
            content_type: 'product',
            value: priceValue(),
            currency: 'INR'
          });
          io.disconnect();
        }
      }, { threshold: 0.15 });
      io.observe(inside);
    }
    return true;
  }

  /* ---------- Buy buttons ---------- */
  function wireBuyButtons(pixelOn) {
    var link = val('BUY_LINK');
    if (!link) {
      console.warn('[SITE_CONFIG] BUY_LINK is empty — buy buttons point to "#". Add your SuperProfile checkout link in config.js.');
    }
    $$('.js-buy').forEach(function (a) {
      a.href = link || '#';
      a.removeAttribute('target');
      a.addEventListener('click', function (e) {
        if (pixelOn && window.fbq) {
          window.fbq('track', 'InitiateCheckout', { value: priceValue(), currency: 'INR' });
        }
        if (!link) { e.preventDefault(); return; }
        // Give the pixel beacon a moment before same-tab navigation (plain left-click only)
        if (pixelOn && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          setTimeout(function () { window.location.href = link; }, 180);
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = $$('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // light stagger for siblings in the same grid
        var parent = el.parentElement;
        var idx = parent ? $$(':scope > .reveal', parent).indexOf(el) : 0;
        el.style.transitionDelay = Math.min(Math.max(idx, 0), 6) * 60 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Mobile sticky bar ---------- */
  function initStickyBar() {
    var bar = doc.getElementById('sticky-bar');
    var heroCta = doc.getElementById('hero-cta');
    var finalCta = doc.getElementById('final-cta');
    if (!bar || !heroCta || !('IntersectionObserver' in window)) return;

    var heroPassed = false, finalVisible = false;
    function update() {
      var show = heroPassed && !finalVisible;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (show) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
    }
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      heroPassed = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    }).observe(heroCta);
    if (finalCta) {
      new IntersectionObserver(function (entries) {
        finalVisible = entries[0].isIntersecting;
        update();
      }).observe(finalCta);
    }
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  function initFaq() {
    var buttons = $$('.faq-q');
    function set(btn, open) {
      var panel = doc.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (panel) panel.classList.toggle('is-open', open);
    }
    buttons.forEach(function (btn) {
      set(btn, btn.getAttribute('aria-expanded') === 'true');
      btn.addEventListener('click', function () {
        var willOpen = btn.getAttribute('aria-expanded') !== 'true';
        buttons.forEach(function (b) { set(b, false); });
        if (willOpen) set(btn, true);
      });
    });
  }

  /* ---------- Topic strip: endless auto-scrolling loop ---------- */
  function initTopics() {
    var wrap = doc.querySelector('.topics-marquee');
    var list = wrap && wrap.querySelector('.topics');
    if (!list || reduceMotion) return;

    var originals = $$(':scope > li', list);
    var SPEED = 45; // px per second

    function build() {
      // reset to the original items
      $$(':scope > li[data-clone]', list).forEach(function (li) { list.removeChild(li); });
      list.classList.remove('is-looping');

      var groupWidth = list.scrollWidth; // width of one full set (margins included)
      if (!groupWidth) return;
      // enough copies to cover the strip twice, so the loop never shows a gap
      var copies = Math.ceil((wrap.clientWidth * 2) / groupWidth);
      for (var c = 0; c < copies; c++) {
        originals.forEach(function (li) {
          var clone = li.cloneNode(true);
          clone.setAttribute('data-clone', '');
          clone.setAttribute('aria-hidden', 'true');
          list.appendChild(clone);
        });
      }
      list.style.setProperty('--loop-distance', groupWidth + 'px');
      list.style.setProperty('--loop-duration', (groupWidth / SPEED) + 's');
      list.classList.add('is-looping');
    }

    // pause while a finger is on the strip (mobile)
    wrap.addEventListener('touchstart', function () { wrap.classList.add('is-paused'); }, { passive: true });
    wrap.addEventListener('touchend', function () { wrap.classList.remove('is-paused'); });
    wrap.addEventListener('touchcancel', function () { wrap.classList.remove('is-paused'); });

    var lastW = wrap.clientWidth, t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () { if (wrap.clientWidth !== lastW) { lastW = wrap.clientWidth; build(); } }, 200);
    });

    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(build); else build();
  }

  /* ---------- Init ---------- */
  function init() {
    fillText();
    applyVisibility();
    fillLinks();
    fillImages();
    fillHead();
    var pixelOn = loadPixel();
    wireBuyButtons(pixelOn);
    initFaq();
    initReveal();
    initStickyBar();
    initTopics();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})();
