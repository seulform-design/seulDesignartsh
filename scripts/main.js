/* ARTISH · main.js — minimal interaction / animation / state */
(() => {
  'use strict';
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* Header — switch on scroll past dark hero (any page) */
  const header = $('.c-header');
  const darkHero = $('.s-hero, .s-cat-hero, .s-ex-hero, .s-ct-hero');
  if (header && darkHero) {
    const io = new IntersectionObserver(([e]) => {
      header.classList.toggle('is-on-hero', e.isIntersecting);
      header.classList.toggle('is-scrolled', !e.isIntersecting);
    }, { threshold: 0.05 });
    io.observe(darkHero);
  }

  /* Mobile menu toggle */
  const menuBtn = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  if (menuBtn && mobileMenu) {
    const close = () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('inert', '');
      document.body.classList.remove('is-menu-locked');
    };
    const open = () => {
      menuBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      mobileMenu.removeAttribute('inert');
      document.body.classList.add('is-menu-locked');
    };
    menuBtn.addEventListener('click', () => {
      if (menuBtn.getAttribute('aria-expanded') === 'true') close();
      else open();
    });
    mobileMenu.querySelector('.c-mobile-menu__close')?.addEventListener('click', close);
    $$('.js-mobile-search').forEach((btn) => {
      btn.addEventListener('click', () => {
        close();
        $('#search-dialog')?.showModal();
      });
    });
    mobileMenu.querySelector('.c-mobile-menu__nav')?.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });
    mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  /* Mega menu (#primaryNav .nav-trigger[data-mega]) */
  const megaMarkup = () => `
      <div class="mega-backdrop" data-mega-close></div>
      <section class="mega-panel" id="mega-shop" data-panel="shop" role="region" aria-label="Shop">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Shop</span>
            <h3 class="mega-title">전체 <em>작품</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./shop.html">베스트셀러 <span class="n">14</span></a></li>
              <li><a href="./shop.html#new">신상품 <span class="n">02</span></a></li>
              <li><a href="./shop.html#under">₩100,000 이하 <span class="n">06</span></a></li>
            </ul>
            <a href="./shop.html" class="mega-allink">전체 컬렉션 보기 →</a>
          </div>
          <a class="mega-feature" href="./product-detail.html">
            <figure class="frame">
              <span class="c-badge c-badge--accent c-badge--dot">Curator's Pick</span>
              <img src="./img/canvas.webp" alt="Where Summer Begins — Elian Moreau" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">Where Summer Begins</span>
              <span class="mega-feat-meta">by <strong>Elian Moreau</strong> · ₩ 120,000</span>
            </div>
          </a>
        </div>
      </section>
      <section class="mega-panel" id="mega-curation" data-panel="curation" role="region" aria-label="Curation">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Curation</span>
            <h3 class="mega-title">큐레이션 <em>세트</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./curation.html#living-set">거실 세트 <span class="n">2점</span></a></li>
              <li><a href="./curation.html#bedroom-set">침실 세트 <span class="n">2점</span></a></li>
              <li><a href="./curation.html#study-set">서재 세트 <span class="n">2점</span></a></li>
              <li><a href="./curation.html#spring-2026">2026 Summer 테마</a></li>
            </ul>
            <a href="./curation.html" class="mega-allink">큐레이션 전체 보기 →</a>
          </div>
          <a class="mega-feature" href="./curation.html#living-set">
            <figure class="frame">
              <span class="c-badge c-badge--num">Set 01</span>
              <img src="./img/cration1.jpg" alt="거실 밸런스 세트 — 큐레이션 2점 구성" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">거실 밸런스 세트</span>
              <span class="mega-feat-meta">큐레이터 <strong>Jo Daun</strong> · ₩ 299,000</span>
            </div>
          </a>
        </div>
      </section>
      <section class="mega-panel" id="mega-spaces" data-panel="spaces" role="region" aria-label="Spaces">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Spaces</span>
            <h3 class="mega-title">공간 <em>기준</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./spaces.html#living">거실 <span class="n">12</span></a></li>
              <li><a href="./spaces.html#bedroom">침실 <span class="n">09</span></a></li>
              <li><a href="./spaces.html#dining">다이닝 <span class="n">07</span></a></li>
              <li><a href="./spaces.html#size-s">사이즈별 보기</a></li>
            </ul>
            <a href="./spaces.html" class="mega-allink">공간 전체 보기 →</a>
          </div>
          <a class="mega-feature" href="./spaces.html#living">
            <figure class="frame">
              <span class="c-badge c-badge--invert">Living · 01 / 05</span>
              <img src="./img/Review11.jpeg" alt="거실 메인월 작품 배치 사례" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">거실 메인월 큐레이션</span>
              <span class="mega-feat-meta">5 rooms · <strong>거실</strong>부터 시작</span>
            </div>
          </a>
        </div>
      </section>
      <section class="mega-panel" id="mega-artists" data-panel="artists" role="region" aria-label="Artists">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Artists</span>
            <h3 class="mega-title">이달의 <em>작가</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./artist.html#kim-a">Ilya Milstein</a></li>
              <li><a href="./artist.html#monthly">이달의 작가</a></li>
              <li><a href="./artist.html#new-talent">신진 작가 <span class="n">03</span></a></li>
              <li><a href="./artist.html#events">예정 이벤트 <span class="n">04</span></a></li>
            </ul>
            <a href="./artist.html" class="mega-allink">작가 전체 보기 →</a>
          </div>
          <a class="mega-feature" href="./artist.html#kim-a">
            <figure class="frame">
              <span class="c-badge c-badge--accent c-badge--dot">Featured · Apr 2026</span>
              <img src="./img/Illyan.jpg" alt="Ilya Milstein — Featured Artist of April 2026" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">Ilya Milstein</span>
              <span class="mega-feat-meta">Studio · <strong>Brooklyn</strong> · 2009 –</span>
            </div>
          </a>
        </div>
      </section>
      <section class="mega-panel" id="mega-gift" data-panel="gift" role="region" aria-label="Gift">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Gift</span>
            <h3 class="mega-title">선물 <em>가이드</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./gift.html#housewarming">집들이</a></li>
              <li><a href="./gift.html#anniversary">기념일</a></li>
              <li><a href="./gift.html#opening-gift">오픈 축하</a></li>
              <li><a href="./gift.html#gift-50">예산별 추천 <span class="n">3</span></a></li>
            </ul>
            <a href="./gift.html" class="mega-allink">선물 전체 보기 →</a>
          </div>
          <a class="mega-feature" href="./gift.html#gift-set">
            <figure class="frame">
              <span class="c-badge">집들이</span>
              <img src="./img/gift.jpg" alt="집들이 선물 세트 큐레이션" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">집들이 세트</span>
              <span class="mega-feat-meta">메시지 카드 포함 · ₩ 169,000</span>
            </div>
          </a>
        </div>
      </section>
      <section class="mega-panel" id="mega-journal" data-panel="journal" role="region" aria-label="Journal">
        <div class="l-container mega-grid">
          <div class="mega-col">
            <span class="mega-eyebrow">Journal</span>
            <h3 class="mega-title">읽어보기 <em>저널</em></h3>
            <ul class="mega-links" role="list">
              <li><a href="./journal.html#essay-styling">스타일링 가이드 <span class="n">3</span></a></li>
              <li><a href="./journal.html#essay-art-space">아트와 공간 <span class="n">3</span></a></li>
              <li><a href="./journal.html#essay-color">컬러 노트</a></li>
            </ul>
            <a href="./journal.html" class="mega-allink">저널 전체 보기 →</a>
          </div>
          <a class="mega-feature" href="./journal.html#essay-styling">
            <figure class="frame">
              <span class="c-badge c-badge--invert">No. 02</span>
              <img src="./img/Review3.jpg" alt="침실 저채도 작품 가이드" loading="lazy">
            </figure>
            <div class="mega-feat-text">
              <span class="mega-feat-title">침실은 왜 저채도 작품이 유리한가</span>
              <span class="mega-feat-meta">4 min read · <strong>Bedroom</strong></span>
            </div>
          </a>
        </div>
      </section>`;

  (function setupMegaMenu() {
    const nav = document.getElementById('primaryNav');
    if (!nav) return;
    let mega = document.getElementById('megaMenu');
    if (!mega) {
      mega = document.createElement('div');
      mega.className = 'mega-menu';
      mega.id = 'megaMenu';
      mega.setAttribute('aria-hidden', 'true');
      const h = document.getElementById('siteHeader');
      if (h && h.parentNode) h.parentNode.insertBefore(mega, h.nextSibling);
    }
    mega.innerHTML = megaMarkup();
    const backdrop = mega.querySelector('.mega-backdrop');
    const panels = mega.querySelectorAll('.mega-panel');
    let openKey = null;

    const openPanel = (key) => {
      openKey = key;
      mega.classList.add('is-open');
      mega.setAttribute('aria-hidden', 'false');
      triggers.forEach((t) => t.setAttribute('aria-expanded', t.dataset.mega === key ? 'true' : 'false'));
      panels.forEach((p) => p.classList.toggle('is-open', p.dataset.panel === key));
    };
    const closeMenu = () => {
      openKey = null;
      mega.classList.remove('is-open');
      mega.setAttribute('aria-hidden', 'true');
      triggers.forEach((t) => t.setAttribute('aria-expanded', 'false'));
      panels.forEach((p) => p.classList.remove('is-open'));
    };

    const navTargetByKey = {
      shop: './shop.html',
      curation: './curation.html',
      spaces: './spaces.html',
      artists: './artist.html',
      gift: './gift.html',
      journal: './journal.html',
    };

    const triggers = nav.querySelectorAll('.nav-trigger[data-mega]');
    if (!triggers.length) return;

    const isSamePath = (targetPath) => {
      const cur = window.location.pathname.replace(/\\/g, '/');
      const norm = targetPath.replace(/^\.\//, '/');
      return cur.endsWith(norm) || cur.endsWith(norm.replace(/^\//, ''));
    };

    triggers.forEach((trigger) => {
      const key = trigger.dataset.mega;
      trigger.addEventListener('mouseenter', () => openPanel(key));
      trigger.addEventListener('focus', () => openPanel(key));
      trigger.addEventListener('click', (e) => {
        const dest = navTargetByKey[key];
        if (dest && !isSamePath(dest)) return;
        e.preventDefault();
        if (openKey === key) closeMenu();
        else openPanel(key);
      });
    });
    mega.addEventListener('mouseleave', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !openKey) return;
      closeMenu();
      e.stopPropagation();
    }, true);
    document.addEventListener('click', (e) => {
      if (!openKey) return;
      if (mega.contains(e.target) || nav.contains(e.target)) return;
      closeMenu();
    });
  })();

  /* Search dialog */
  const dlg = $('#search-dialog');
  $('#search-toggle')?.addEventListener('click', () => dlg?.showModal());
  $('.c-search__close')?.addEventListener('click', () => dlg?.close());

  /* Style chips — single select */
  $$('.s-style__chips .c-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.s-style__chips .c-chip').forEach(c => {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
    });
  });

  /* Decision finder — live feedback */
  const dForm = $('#decision-form');
  const dFb = $('#decision-feedback');
  if (dForm && dFb) {
    const update = () => {
      const fd = new FormData(dForm);
      const picked = ['space', 'mood', 'price'].filter(k => fd.get(k));
      dFb.textContent = picked.length
        ? `${picked.length}개 조건 선택됨 — 추천 보기를 눌러주세요`
        : '';
    };
    dForm.addEventListener('change', update);
    dForm.addEventListener('reset', () => setTimeout(update, 0));
  }

  /* Compare bar */
  const compareBar = $('#compareBar');
  const compareList = $('#compareList');
  const compareCount = $('#compareCount');
  const compareGo = $('#compareGoBtn');
  const compareReset = $('#compareResetBtn');
  const items = new Map();
  const MAX = 3;

  const renderCompare = () => {
    if (!compareBar) return;
    compareCount.textContent = items.size;
    if (items.size === 0) {
      compareBar.hidden = true;
      compareList.innerHTML = '<span class="c-compare__empty">아직 선택된 작품이 없습니다</span>';
      compareGo.disabled = true;
      return;
    }
    compareBar.hidden = false;
    compareList.innerHTML = '';
    items.forEach((data, id) => {
      const chip = document.createElement('span');
      chip.className = 'c-compare__chip';
      chip.innerHTML = `<span>${data.name}</span><button type="button" aria-label="${data.name} 제거" data-remove="${id}">×</button>`;
      compareList.appendChild(chip);
    });
    compareGo.disabled = items.size < 2;
  };

  $$('[data-compare-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.compareId;
      if (items.has(id)) { items.delete(id); }
      else if (items.size < MAX) { items.set(id, { name: btn.dataset.compareName, img: btn.dataset.compareImg }); }
      btn.classList.toggle('is-active', items.has(id));
      renderCompare();
    });
  });

  compareList?.addEventListener('click', e => {
    const t = e.target.closest('[data-remove]');
    if (!t) return;
    items.delete(t.dataset.remove);
    $$(`[data-compare-id="${t.dataset.remove}"]`).forEach(b => b.classList.remove('is-active'));
    renderCompare();
  });
  compareReset?.addEventListener('click', () => {
    items.clear();
    $$('[data-compare-id]').forEach(b => b.classList.remove('is-active'));
    renderCompare();
  });

  /* Back to top */
  const bt = $('#back-to-top');
  if (bt) {
    const onScroll = () => bt.classList.toggle('is-visible', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Wishlist toggle (visual only) */
  $$('[data-wish]').forEach(b => {
    b.addEventListener('click', () => b.classList.toggle('is-on'));
  });

  /* PDP — size guide: 선택 상태 · 헤더 메타 동기화 · 키보드 */
  const sizeGrid = $('.s-pdp-size__grid');
  const sizeHeadMeta = $('.s-pdp-size__head .meta');
  if (sizeGrid && sizeHeadMeta) {
    const sizeItems = $$('.s-pdp-size__item', sizeGrid);
    const syncMeta = (label) => {
      if (label) sizeHeadMeta.textContent = `현재 선택 · ${label}`;
    };
    const activate = (article) => {
      sizeItems.forEach((el) => {
        const on = el === article;
        el.classList.toggle('is-current', on);
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      syncMeta(article.dataset.sizeLabel || '');
    };
    sizeItems.forEach((article) => {
      article.setAttribute('role', 'button');
      article.setAttribute('tabindex', '0');
      article.setAttribute('aria-pressed', article.classList.contains('is-current') ? 'true' : 'false');
      const open = () => activate(article);
      article.addEventListener('click', open);
      article.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
    const initial = $('.s-pdp-size__item.is-current', sizeGrid);
    if (initial?.dataset.sizeLabel) syncMeta(initial.dataset.sizeLabel);
  }

  /* Sticky purchase bar (PDP) — show after hero gallery scroll past */
  const stickyBuy = $('#stickyBuy');
  const heroSentinel = $('.s-pdp-gallery') || $('.s-pdp-hero');
  if (stickyBuy && heroSentinel) {
    stickyBuy.hidden = false;
    const stickyIO = new IntersectionObserver(([e]) => {
      stickyBuy.classList.toggle('is-visible', !e.isIntersecting);
    }, { threshold: 0 });
    stickyIO.observe(heroSentinel);
  }

  /* Motion — fade-up reveal on intersection */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fades = $$('.is-fade');
  if (fades.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      fades.forEach(el => el.classList.add('is-in'));
    } else {
      const fadeIO = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            obs.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      fades.forEach(el => fadeIO.observe(el));
    }
  }
})();
