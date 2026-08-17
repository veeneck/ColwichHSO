/* Colwich HSO — shared scripts */
'use strict';

/* ── Mobile menu: close on nav link click ── */
document.querySelectorAll('#menu a').forEach(function (a) {
  a.addEventListener('click', function () {
    var menu = document.getElementById('menu');
    var link = document.getElementById('menuLink');
    if (menu) menu.classList.remove('open');
    if (link) link.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Hamburger menu toggle ── */
(function () {
  var link = document.getElementById('menuLink');
  var menu = document.getElementById('menu');
  if (!link || !menu) return;

  function openMenu() {
    link.classList.add('open');
    menu.classList.remove('closed');
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    link.classList.remove('open');
    menu.classList.add('closed');
    window.setTimeout(function () {
      if (!link.classList.contains('open')) {
        menu.classList.remove('open');
        menu.classList.remove('closed');
      }
    }, 320);
    document.body.style.overflow = '';
  }

  function toggleMenu(e) {
    if (e) e.preventDefault();
    if (link.classList.contains('open')) closeMenu();
    else openMenu();
  }

  link.addEventListener('click', toggleMenu);
  link.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') toggleMenu(e);
  });

  // Mobile dropdown accordion
  menu.querySelectorAll('.dropbtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth >= 1080) return;
      e.preventDefault();
      var parent = btn.parentNode;
      menu.querySelectorAll('.dropdown.subopen').forEach(function (d) {
        if (d !== parent) d.classList.remove('subopen');
      });
      parent.classList.toggle('subopen');
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1080 && link.classList.contains('open')) {
      closeMenu();
    }
  });
})();

/* ── Event lightbox + FAQ accordion ── */
(function () {
  function initEventLightbox() {
    var lb = document.getElementById('eventLightbox');
    if (!lb) return; // pages without lightbox are fine

    var lbEmoji = document.getElementById('lbEmoji');
    var lbDate = document.getElementById('lbDate');
    var lbTitle = document.getElementById('lbTitle');
    var lbBody = document.getElementById('lbBody');
    var lbFlyer = document.getElementById('lbFlyer');
    var lbFaqs = document.getElementById('lbFaqs');
    var lbFaqList = document.getElementById('lbFaqList');
    var scrollEl = lb.querySelector('.event-lightbox-scroll');

    function getEventData(wrap) {
      var emojiEl = wrap.querySelector('.event-emoji');
      var dateEl = wrap.querySelector('.event-date');
      var titleEl = wrap.querySelector('h4');
      var shortP = wrap.querySelector('.event-body > p');
      var details = wrap.querySelector('.event-details');
      var faqs = [];
      try {
        var raw = wrap.getAttribute('data-faqs');
        if (raw) faqs = JSON.parse(raw);
      } catch (err) {}
      var emoji = emojiEl ? emojiEl.textContent.trim() : '';
      var title = '';
      if (titleEl) {
        var clone = titleEl.cloneNode(true);
        clone.querySelectorAll('.event-emoji').forEach(function (el) { el.remove(); });
        title = clone.textContent.replace(/\s+/g, ' ').trim();
      }
      var startTime = (wrap.getAttribute('data-start-time') || '').trim();
      var endTime = (wrap.getAttribute('data-end-time') || '').trim();
      // Card pill may already include " · time" — use date only here
      var dateLabel = dateEl ? dateEl.textContent.trim() : 'TBD';
      dateLabel = dateLabel.split('\u00b7')[0].split('·')[0].trim();
      var timeLabel = '';
      if (startTime && endTime) timeLabel = startTime + ' – ' + endTime;
      else if (startTime) timeLabel = startTime;
      else if (endTime) timeLabel = endTime;
      return {
        id: wrap.id || '',
        emoji: emoji,
        date: dateLabel,
        time: timeLabel,
        title: title,
        shortDesc: shortP ? shortP.textContent.trim() : '',
        detailsHtml: details ? details.innerHTML : '',
        faqs: faqs
      };
    }

    function renderFaqs(faqs) {
      if (!lbFaqList || !lbFaqs) return;
      lbFaqList.innerHTML = '';
      if (!faqs || !faqs.length) {
        lbFaqs.hidden = true;
        return;
      }
      lbFaqs.hidden = false;
      faqs.forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'lb-faq-item';
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'lb-faq-q';
        btn.setAttribute('aria-expanded', 'false');
        var label = document.createElement('span');
        label.textContent = item.q || '';
        var chevron = document.createElement('span');
        chevron.className = 'lb-faq-chevron';
        chevron.textContent = '▼';
        btn.appendChild(label);
        btn.appendChild(chevron);
        var ans = document.createElement('div');
        ans.className = 'lb-faq-a';
        ans.textContent = item.a || '';
        btn.addEventListener('click', function () {
          var opening = !row.classList.contains('is-open');
          lbFaqList.querySelectorAll('.lb-faq-item.is-open').forEach(function (other) {
            other.classList.remove('is-open');
            var ob = other.querySelector('.lb-faq-q');
            if (ob) ob.setAttribute('aria-expanded', 'false');
          });
          if (opening) {
            row.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
        row.appendChild(btn);
        row.appendChild(ans);
        lbFaqList.appendChild(row);
      });
    }

    function openLightbox(wrap) {
      if (!wrap) return;
      var data = getEventData(wrap);
      if (lbEmoji) { lbEmoji.textContent = ''; lbEmoji.hidden = true; }
      // Date moved next to short title in body (not top bar)
      if (lbDate) {
        lbDate.textContent = '';
        lbDate.hidden = true;
      }
      if (lbTitle) lbTitle.textContent = (data.emoji ? data.emoji + ' ' : '') + (data.title || '');

      var body = '';
      var day = String(data.date || 'TBD').replace(/</g, '&lt;');
      var time = data.time ? String(data.time).replace(/</g, '&lt;') : '';
      var dateHtml = '<span class="event-date-day">' + day + '</span>';
      if (time) {
        dateHtml += '<span class="event-date-sep"> · </span><span class="event-date-time">' + time + '</span>';
      }
      body += '<div class="event-lightbox-date-inline">' + dateHtml + '</div>';
      if (data.shortDesc) {
        body += '<p class="event-lightbox-short"><strong>' + data.shortDesc.replace(/</g, '&lt;') + '</strong></p>';
      }
      if (data.detailsHtml) body += data.detailsHtml;
      if (!body) body = '<p>More details coming soon.</p>';
      if (lbBody) lbBody.innerHTML = body;

      var panel = lb.querySelector('.event-lightbox-panel');
      var flyerUrl = wrap.getAttribute('data-flyer');
      if (lbFlyer) {
        if (flyerUrl) {
          lbFlyer.hidden = false;
          lbFlyer.innerHTML =
            '<img src="' + flyerUrl + '" alt="' +
            (data.title || 'Event').replace(/"/g, '&quot;') +
            ' flyer" loading="lazy" />';
          if (panel) panel.classList.add('has-flyer');
        } else {
          lbFlyer.hidden = true;
          lbFlyer.innerHTML = '';
          if (panel) panel.classList.remove('has-flyer');
        }
      }

      renderFaqs(data.faqs);

      lb.hidden = false;
      lb.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      if (scrollEl) scrollEl.scrollTop = 0;
      if (data.id) history.replaceState(null, '', '#' + data.id);
      var closeBtn = lb.querySelector('.event-lightbox-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      lb.classList.remove('is-open');
      lb.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    document.querySelectorAll('.event-card-wrap').forEach(function (wrap) {
      wrap.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var link = wrap.getAttribute('data-link');
        if (link) {
          window.location.href = link;
          return;
        }
        e.preventDefault();
        openLightbox(wrap);
      });
    });

    lb.querySelectorAll('[data-lb-close]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        closeLightbox();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox();
    });

    function handleHash() {
      var hash = (location.hash || '').replace(/^#/, '');
      if (!hash) return;
      var el = document.getElementById(hash);
      if (el && el.classList.contains('event-card-wrap')) {
        var link = el.getAttribute('data-link');
        if (link) {
          window.location.href = link;
          return;
        }
        el.scrollIntoView({ block: 'center', behavior: 'auto' });
        openLightbox(el);
      }
    }

    handleHash();
    window.addEventListener('hashchange', handleHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEventLightbox);
  } else {
    initEventLightbox();
  }
})();


/* ── Page FAQ accordion (About and other pages) ── */
(function () {
  function initPageFaqs() {
    var list = document.querySelector('.page-faq-list');
    if (!list) return;
    list.querySelectorAll('.page-faq-item').forEach(function (item) {
      var btn = item.querySelector('.page-faq-q');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var opening = !item.classList.contains('is-open');
        list.querySelectorAll('.page-faq-item.is-open').forEach(function (other) {
          other.classList.remove('is-open');
          var ob = other.querySelector('.page-faq-q');
          if (ob) ob.setAttribute('aria-expanded', 'false');
        });
        if (opening) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageFaqs);
  } else {
    initPageFaqs();
  }
})();

/* ── Sponsor package lightbox ── */
(function () {
  function initPkgLightbox() {
    var lb = document.getElementById('pkgLightbox');
    if (!lb) return;

    var lbEyebrow = document.getElementById('pkgLbEyebrow');
    var lbTitle = document.getElementById('pkgLbTitle');
    var lbSummary = document.getElementById('pkgLbSummary');
    var lbBenefits = document.getElementById('pkgLbBenefits');
    var lbPurchaseTop = document.getElementById('pkgLbPurchaseTop');
    var lbPurchaseBottom = document.getElementById('pkgLbPurchaseBottom');
    var lbPurchaseTopLabel = document.getElementById('pkgLbPurchaseTopLabel');
    var lbPurchaseBottomLabel = document.getElementById('pkgLbPurchaseBottomLabel');
    var lbLearnMore = document.getElementById('pkgLbLearnMore');
    var scrollEl = lb.querySelector('.event-lightbox-scroll');

    function openPkg(card) {
      if (!card) return;
      var title = card.getAttribute('data-pkg-title') || '';
      var price = card.getAttribute('data-pkg-price') || '';
      var summary = card.getAttribute('data-pkg-summary') || '';
      var purchase = card.getAttribute('data-pkg-purchase') || '#';
      var benefits = [];
      try {
        benefits = JSON.parse(card.getAttribute('data-pkg-benefits') || '[]');
      } catch (e) {}

      // Eyebrow: "$250 HSO Sponsorship"
      if (lbEyebrow) {
        var eye = document.createElement('b');
        eye.textContent = price + ' HSO Sponsorship';
        lbEyebrow.innerHTML = '';
        lbEyebrow.appendChild(eye);
      }
      if (lbTitle) lbTitle.textContent = title;
      if (lbSummary) lbSummary.textContent = summary;

      // Purchase labels e.g. "Purchase Logo Package"
      var shortName = title.replace(/[📋🌅🚩🪧🪙🏦]/g, '').trim();
      var buyLabel = 'Purchase ' + shortName.replace(/^The\s+/i, '');
      if (lbPurchaseTopLabel) lbPurchaseTopLabel.textContent = buyLabel;
      if (lbPurchaseBottomLabel) lbPurchaseBottomLabel.textContent = buyLabel;
      if (lbPurchaseTop) {
        lbPurchaseTop.href = purchase;
        lbPurchaseTop.style.display = purchase && purchase !== '#' ? '' : 'none';
      }
      if (lbPurchaseBottom) {
        lbPurchaseBottom.href = purchase;
        lbPurchaseBottom.style.display = purchase && purchase !== '#' ? '' : 'none';
      }

      if (lbBenefits) {
        lbBenefits.innerHTML = '';
        benefits.forEach(function (b, i) {
          var li = document.createElement('li');
          // Featured if title has star (live special_item)
          var title = b.title || '';
          if (title.indexOf('⭐') !== -1 || b.featured) {
            li.className = 'special_item';
          }

          var perk = document.createElement('div');
          perk.className = 'perk';
          var order = document.createElement('b');
          order.className = 'perkOrder';
          order.textContent = String(i + 1) + '.';
          perk.appendChild(order);

          var desc = document.createElement('div');
          desc.className = 'desc';
          var h = document.createElement('h4');
          var order2 = document.createElement('b');
          order2.className = 'perkOrder';
          order2.textContent = String(i + 1) + '. ';
          h.appendChild(order2);
          h.appendChild(document.createTextNode(title));
          var p = document.createElement('p');
          p.textContent = b.body || '';
          desc.appendChild(h);
          desc.appendChild(p);

          li.appendChild(perk);
          li.appendChild(desc);
          lbBenefits.appendChild(li);
        });
      }

      lb.hidden = false;
      lb.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      if (scrollEl) scrollEl.scrollTop = 0;
      if (card.id) history.replaceState(null, '', '#' + card.id);
    }

    function closePkg() {
      lb.classList.remove('is-open');
      lb.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    document.querySelectorAll('.sponsor-pkg-card').forEach(function (card) {
      card.querySelectorAll('.pkg-details-link, .pkg-title-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          openPkg(card);
        });
      });
    });

    lb.querySelectorAll('[data-pkg-close]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        closePkg();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closePkg();
    });

    if (lbLearnMore) {
      lbLearnMore.addEventListener('click', function (e) {
        e.preventDefault();
        if (lbBenefits) {
          lbBenefits.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }


    function handleHash() {
      var hash = (location.hash || '').replace(/^#/, '');
      if (!hash) return;
      var card = document.getElementById(hash);
      if (card && card.classList.contains('sponsor-pkg-card')) {
        card.scrollIntoView({ block: 'center', behavior: 'auto' });
        openPkg(card);
      }
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPkgLightbox);
  } else {
    initPkgLightbox();
  }
})();


/* ── Coin Wars sticky subnav ── */
(function () {
  function initCwNav() {
    var nav = document.getElementById('cwNav');
    if (!nav) return;
    // sticky via CSS; mark stuck for shadow when intersecting top
    var observer = null;
    try {
      var sentinel = document.createElement('div');
      sentinel.style.position = 'relative';
      sentinel.style.height = '1px';
      sentinel.style.marginTop = '-1px';
      nav.parentNode.insertBefore(sentinel, nav);
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio < 1) {
            nav.classList.add('stuck');
          } else {
            nav.classList.remove('stuck');
          }
        });
      }, { threshold: [1] });
      observer.observe(sentinel);
    } catch (e) {
      nav.classList.add('stuck');
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCwNav);
  } else {
    initCwNav();
  }
})();

  /* Calendar sync: Android uses Google render URL; track Fathom goal BI7I1FAC on click */
  (function initCalendarSync() {
    var WEBCAL = 'webcal://calendar.google.com/calendar/ical/r396gjmq9slavbd7qt8b1bd288%40group.calendar.google.com/public/basic.ics';
    var ANDROID = 'https://www.google.com/calendar/render?cid=https://calendar.google.com/calendar/ical/r396gjmq9slavbd7qt8b1bd288%40group.calendar.google.com/public/basic.ics';
    var isAndroid = /android/i.test(navigator.userAgent || '');

    function applyHref(a) {
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('webcal://') === 0 || href.indexOf('calendar.google.com/calendar/ical') !== -1) {
        a.setAttribute('href', isAndroid ? ANDROID : WEBCAL);
      }
      if (!a.getAttribute('onclick') || a.getAttribute('onclick').indexOf('trackGoal') === -1) {
        a.addEventListener('click', function () {
          try {
            if (window.fathom && typeof window.fathom.trackGoal === 'function') {
              window.fathom.trackGoal('BI7I1FAC', 0);
            }
          } catch (err) {}
        });
      }
    }

    function scan() {
      document.querySelectorAll('a[href*="webcal://"], a[href*="calendar.google.com/calendar/ical"], a.calendar-sync-btn, #calendarCTA').forEach(applyHref);
    }

    scan();
    // re-scan when lightbox opens (dynamic content)
    var obs = new MutationObserver(function () { scan(); });
    if (document.body) obs.observe(document.body, { childList: true, subtree: true });
  })();

