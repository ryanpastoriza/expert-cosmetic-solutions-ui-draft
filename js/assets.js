(function (global) {
  'use strict';

  /** Relative paths from ecs-homepage-src/ */
  const BRAND_LOGO = 'assets/Expert-Cosmetic-Solutions-Logo-Transparent.png';

  const ASSETS = {
    logoBrand: BRAND_LOGO,
    logoMark: BRAND_LOGO,
    logoFooter: BRAND_LOGO,
    logoFull: BRAND_LOGO,
    aboutTeam: 'assets/about-use-image.jpg',
    heroHome: 'assets/photos/hero-home.jpg',
    laserRejuvenationHero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&h=1050&q=80',
    laserRejuvenationIntro: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&h=900&q=80',
    serviceLaserHairRemoval: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&h=380&q=80',
    serviceCosmeticInjectables: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&h=380&q=80',
    serviceSkinNeedling: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&h=380&q=80',
    serviceLaserRejuvenation: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&h=380&q=80',
    serviceFacialsPeels: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&h=380&q=80',
    serviceDoubleChin: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&h=380&q=80'
  };

  function getAssetBase() {
    const script = document.currentScript || document.querySelector('script[src*="assets.js"]');
    if (script && script.src) {
      return script.src.replace(/js\/assets\.js(?:\?.*)?$/, '');
    }
    return '';
  }

  function resolveAsset(relativePath) {
    if (!relativePath) return '';
    if (/^https?:\/\//i.test(relativePath)) return relativePath;
    const base = getAssetBase();
    if (!base) return relativePath;
    try {
      return new URL(relativePath, base).href;
    } catch {
      return relativePath;
    }
  }

  function applyDataAssets() {
    document.querySelectorAll('[data-ecs-asset]').forEach((el) => {
      const key = el.getAttribute('data-ecs-asset');
      const path = ASSETS[key];
      if (!path) return;

      const resolved = resolveAsset(path);
      if (el.tagName === 'IMG') {
        el.src = resolved;
      } else if (el.tagName === 'SOURCE') {
        el.src = resolved;
      }
    });
  }

  global.ECS_ASSETS = ASSETS;
  global.ecsResolveAsset = resolveAsset;
  global.ecsApplyAssets = applyDataAssets;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDataAssets);
  } else {
    applyDataAssets();
  }
})(window);
