/* home-anim.js
 * Purpose: subtle cinematic scroll-in animations for the Neo-style home cover.
 * CSP-friendly: external script, no inline eval.
 */
(function () {
  function ready(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function markAnimated(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll('.neo-hero, .neo-card, .neo-grid, h2, h3, p, ul, ol');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.classList.contains('neo-anim')) continue;
      // Only animate items on /#/home to avoid impacting docs pages
      el.classList.add('neo-anim');
    }
  }

  function isHome() {
    // Docsify uses hash routing
    return location.hash === '#/home' || location.hash.startsWith('#/home?');
  }

  function setup() {
    if (!isHome()) return;

    // Mark elements for animation
    markAnimated(document);

    var els = Array.prototype.slice.call(document.querySelectorAll('.neo-anim'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('neo-anim--in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('neo-anim--in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  ready(function () {
    setup();

    // Docsify rerenders on route changes; re-run on hash change
    window.addEventListener('hashchange', function () {
      // small delay to allow Docsify render
      setTimeout(setup, 50);
    });
  });
})();
