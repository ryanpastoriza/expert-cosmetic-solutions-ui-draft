(function () {
  'use strict';

  const FAQS = [
    { q: 'What is anti-wrinkle and dermal filler treatment?', a: 'Treatments designed to soften lines caused by repeated facial movements, creating a smoother and more refreshed appearance. Dermal fillers restore volume, enhance facial features and support areas that may have lost structure over time. All treatments are tailored following a personalised consultation.' },
    { q: 'Will I look overdone and unnatural?', a: 'No. Our approach focuses on subtle, natural-looking results that enhance your features, not change them.' },
    { q: 'How long do results last?', a: 'Anti-wrinkle results typically last around 3-4 months, depending on the individual. Dermal filler results typically last between 6-18 months, depending on the area treated and individual metabolism.' },
    { q: 'Is there any downtime?', a: 'Most clients return to normal activities straight after treatment, with minimal downtime. With dermal fillers, you may experience some swelling or bruising which usually settles within a few days.' },
    { q: 'Are treatments painful?', a: 'Most treatments are tolerable. You may feel small pinches or pressure but discomfort is minimal and brief. Numbing is used to keep you comfortable throughout.' },
    { q: 'Which treatment is right for my skin?', a: "We'll guide you during your consultation based on your skin type, concerns and goals so you don't have to guess." },
    { q: 'Is Laser Hair Removal permanent?', a: 'Laser significantly reduces hair growth over time. Typically 6-10 sessions are recommended, depending on the area and hair type. Maintenance sessions may be needed to keep results long term.' },
    { q: 'Does Laser Hair Removal hurt?', a: "Most clients describe it as a quick snapping sensation. It's very manageable." },
    { q: 'What is Skin Needling?', a: "A treatment that stimulates your skin's natural repair process to improve texture, tone, and overall skin quality." },
    { q: 'What is Rejuran?', a: 'Rejuran is a skin treatment designed to support skin quality, texture and overall appearance by stimulating the natural skin repair process. Unlike fillers, Rejuran focuses on improving skin quality rather than adding volume.' },
    { q: 'How do I book?', a: 'You can book online, or contact us via call, text, or on our socials. Whatever is easiest for you.' },
    { q: 'What payment methods do you accept?', a: 'Mastercard & Visa, Amex, ZipPay, AfterPay, Osko payment via bank transfer and cash.' },
    { q: 'Where are you located?', a: 'We have clinics in Pakenham (1A 9-17 Lakeside Blvd) and Warragul (17 Williams Square), serving clients across Melbourne and surrounding areas.' }
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
      btn.innerHTML = `<span>${faq.q}</span><span class="faq-arrow" aria-hidden="true">+</span>`;

      const panel = document.createElement('div');
      panel.className = 'faq-panel';
      panel.id = 'faqPanel' + i;
      panel.innerHTML = `<p>${faq.a}</p>`;

      btn.addEventListener('click', () => {
        const isOpen = wrap.classList.contains('is-open');

        container.querySelectorAll('.faq-item').forEach((item) => {
          item.classList.remove('is-open');
          const p = item.querySelector('.faq-panel');
          const arrow = item.querySelector('.faq-arrow');
          if (p) p.style.maxHeight = '0px';
          if (arrow) arrow.textContent = '+';
        });

        if (!isOpen) {
          wrap.classList.add('is-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          btn.querySelector('.faq-arrow').textContent = '-';
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
