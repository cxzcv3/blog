/* 星空 + 光标光晕 + 小交互 */
(function () {
  /* ---------- 光标光晕 ---------- */
  var glow = null;

  function ensureGlow() {
    if (glow && document.body.contains(glow)) return glow;
    glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    return glow;
  }

  var raf = null;
  function onMove(e) {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      var g = ensureGlow();
      g.style.left = e.clientX + 'px';
      g.style.top = e.clientY + 'px';
      g.style.opacity = '1';
      raf = null;
    });
  }

  /* ---------- 顶部星空 ---------- */
  function initStars() {
    var header = document.getElementById('page-header');
    if (!header || header.querySelector('.dsh-stars')) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'dsh-stars';
    header.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var stars = [];
    var w = 0, h = 0;

    function resize() {
      w = canvas.width = header.clientWidth;
      h = canvas.height = header.clientHeight;
      var count = Math.round((w * h) / 14000);
      stars = [];
      for (var i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.3,
          vy: Math.random() * 0.35 + 0.08,
          a: Math.random() * 0.6 + 0.2,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function tick() {
      if (!document.body.contains(canvas)) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y -= s.vy;
        s.tw += 0.02;
        if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
        var alpha = s.a * (0.65 + 0.35 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.9).toFixed(3) + ')';
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }

    resize();
    tick();

    var rt = null;
    window.addEventListener('resize', function () {
      if (rt) clearTimeout(rt);
      rt = setTimeout(resize, 200);
    });
  }

  function init() {
    ensureGlow();
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', function () {
      if (glow) glow.style.opacity = '0';
    });
    initStars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('pjax:complete', function () {
    glow = null;
    ensureGlow();
    initStars();
  });
})();
