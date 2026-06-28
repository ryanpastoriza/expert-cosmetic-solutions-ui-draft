(function (global) {
  'use strict';

  /** Relative paths from ecs-homepage-src/ */
  const ASSETS = {
    logoMark: 'assets/logo-mark.svg',
    logoFooter: 'assets/logo-mark-footer.svg',
    logoFull: 'assets/Expert-Cosmetic-Solutions-Logo-Transparent.png',
    aboutTeam: 'assets/about-use-image.jpg',
    serviceLaserRejuvenation: 'assets/services/laser-skin-rejuvenation.svg',
    serviceLaserHairRemoval: 'assets/services/laser-hair-removal.svg',
    serviceCosmeticInjectables: 'assets/services/cosmetic-injectables.svg',
    serviceSkinNeedling: 'assets/services/skin-needling.svg',
    serviceFacialsPeels: 'assets/services/facials-peels.svg',
    serviceDoubleChin: 'assets/services/double-chin-treatment.svg'
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
