(function () {
  'use strict';

  const FAQS = [
    {
      q: 'Which treatment is right for my skin?',
      a: "We will guide you during your consultation based on your skin type, concerns and goals so you do not have to guess."
    },
    {
      q: 'Is there downtime with laser skin rejuvenation?',
      a: 'Most clients experience mild to moderate redness that fades within a few hours. Avoid heavy exercise for 24 to 48 hours and follow our aftercare guide for the best recovery.'
    },
    {
      q: 'How many sessions will I need?',
      a: 'A minimum of four to six treatments is recommended, spaced four weeks apart. Response varies and some clients may need additional or touch-up treatments over time.'
    },
    {
      q: 'How soon will I see results?',
      a: 'Non-ablative skin rejuvenation is a gradual process. Some clients notice an immediate glow, while collagen remodelling continues to improve firmness, tone and texture over the following weeks.'
    },
    {
      q: 'How often should I have treatments?',
      a: 'Treatments are typically scheduled four weeks apart for an initial course. Many clients continue with ongoing sessions as part of their normal skincare routine.'
    },
    {
      q: 'Do I need a consultation first?',
      a: 'Yes. All treatments begin with a consultation to ensure the right approach for your skin and goals. Book a free 15-minute consultation to get started.'
    },
    {
      q: 'How do I book?',
      a: 'You can book online, or contact us via call, text, or on our socials. Whatever is easiest for you.'
    },
    {
      q: 'Where are you located?',
      a: 'We have clinics in Pakenham (1A 9-17 Lakeside Blvd) and Warragul (17 Williams Square), serving clients across Melbourne and surrounding areas.'
    }
  ];

  function initNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    const resetHamburger = () => {
      ['ham1', 'ham2', 'ham3'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.transform = '';
        el.style.opacity = i === 1 ? '1' : '';
      });
    };

    toggle.addEventListener('click', () => {
      const isOpen = menu.style.maxHeight && menu.style.maxHeight !== '0px';
      menu.style.maxHeight = isOpen ? '0px' : '600px';
      toggle.setAttribute('aria-expanded', String(!isOpen));

      const h1 = document.getElementById('ham1');
      const h2 = document.getElementById('ham2');
      const h3 = document.getElementById('ham3');
      if (h1 && h2 && h3) {
        if (!isOpen) {
          h1.style.transform = 'translateY(6.5px) rotate(45deg)';
          h2.style.opacity = '0';
          h3.style.transform = 'translateY(-6.5px) rotate(-45deg)';
        } else {
          resetHamburger();
        }
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.style.maxHeight = '0px';
        toggle.setAttribute('aria-expanded', 'false');
        resetHamburger();
      });
    });
  }

  function handleResize() {
    const nav = document.getElementById('desktopNav');
    const toggle = document.getElementById('navToggle');
    if (!nav || !toggle) return;

    if (window.innerWidth <= 900) {
      nav.style.display = 'none';
      toggle.style.display = 'flex';
    } else {
      nav.style.display = 'flex';
      toggle.style.display = 'none';
      const menu = document.getElementById('mobileMenu');
      if (menu) menu.style.maxHeight = '0px';
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function renderFAQ() {
    const container = document.getElementById('faqList');
    if (!container) return;
    container.innerHTML = '';

    FAQS.forEach((faq, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'faq-item';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-btn';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'faqPanel' + i);
      btn.innerHTML = `<span>${faq.q}</span><span class="faq-arrow" aria-hidden="true">+</span>`;

      const panel = document.createElement('div');
      panel.className = 'faq-panel';
      panel.id = 'faqPanel' + i;
      panel.setAttribute('role', 'region');
      panel.innerHTML = `<p>${faq.a}</p>`;

      btn.addEventListener('click', () => {
        const isOpen = wrap.classList.contains('is-open');

        container.querySelectorAll('.faq-item').forEach((item) => {
          item.classList.remove('is-open');
          const p = item.querySelector('.faq-panel');
          const b = item.querySelector('.faq-btn');
          const arrow = item.querySelector('.faq-arrow');
          if (p) p.style.maxHeight = '0px';
          if (arrow) arrow.textContent = '+';
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          wrap.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.querySelector('.faq-arrow').textContent = '-';
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      wrap.appendChild(btn);
      wrap.appendChild(panel);
      container.appendChild(wrap);
    });
  }

  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = document.querySelectorAll('.reveal');
    if (!items.length || prefersReduced) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const staggerGroups = new Map();
    items.forEach((el) => {
      if (el.style.getPropertyValue('--reveal-delay')) return;
      const parent = el.parentElement;
      if (!parent) return;
      const index = staggerGroups.get(parent) || 0;
      el.style.setProperty('--reveal-delay', `${index * 55}ms`);
      staggerGroups.set(parent, index + 1);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderFAQ();
    initScrollReveal();
    initHeaderScroll();
    handleResize();
    window.addEventListener('resize', handleResize);
  });
})();
