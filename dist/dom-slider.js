"use strict";

(function () {
  'use strict';

  initDomSlider();
  initPrintStyles();

  function initDomSlider() {
    var sheet = document.createElement('style');
    sheet.id = 'dom-slider';
    sheet.innerHTML = "\n      .DOM-slider-hidden {\n        height: 0 !important;\n        padding-top: 0 !important;\n        padding-bottom: 0 !important;\n        border-top-width: 0 !important;\n        border-bottom-width: 0 !important;\n        margin-top: 0 !important;\n        margin-bottom: 0 !important;\n        overflow: hidden !important;\n      }\n    ";
    document.head.appendChild(sheet);

    function slideDown(_ref) {
      var element = _ref.element,
          slideSpeed = _ref.slideSpeed,
          easing = _ref.easing,
          delay = _ref.delay,
          visibleDisplayValue = _ref.visibleDisplayValue;
      return slide({
        element: element,
        slideSpeed: slideSpeed,
        direction: 'down',
        easing: easing,
        delay: delay,
        visibleDisplayValue: visibleDisplayValue
      });
    }

    function slideUp(_ref2) {
      var element = _ref2.element,
          slideSpeed = _ref2.slideSpeed,
          easing = _ref2.easing,
          delay = _ref2.delay;
      return slide({
        element: element,
        slideSpeed: slideSpeed,
        direction: 'up',
        easing: easing,
        delay: delay
      });
    }

    function slideToggle(_ref3) {
      var element = _ref3.element,
          slideSpeed = _ref3.slideSpeed,
          easing = _ref3.easing,
          delay = _ref3.delay,
          visibleDisplayValue = _ref3.visibleDisplayValue;
      return slide({
        element: element,
        slideSpeed: slideSpeed,
        easing: easing,
        delay: delay,
        visibleDisplayValue: visibleDisplayValue
      });
    }

    window.domSlider = {
      slideDown: slideDown,
      slideUp: slideUp,
      slideToggle: slideToggle
    };
  }

  function slide(_ref4) {
    var element = _ref4.element,
        slideSpeed = _ref4.slideSpeed,
        direction = _ref4.direction,
        easing = _ref4.easing,
        _ref4$delay = _ref4.delay,
        delay = _ref4$delay === void 0 ? 0 : _ref4$delay,
        _ref4$visibleDisplayV = _ref4.visibleDisplayValue,
        visibleDisplayValue = _ref4$visibleDisplayV === void 0 ? 'block' : _ref4$visibleDisplayV;
    var domSliderId = element.dataset.domSliderId || (Date.now() * Math.random()).toFixed(0);

    if (!element.dataset.domSliderId) {
      element.dataset.domSliderId = domSliderId;
    }

    var computedStyle = window.getComputedStyle(element);
    var isDisplayNoneByDefault = computedStyle.getPropertyValue('display') === 'none';
    var slideDirection = direction || (isDisplayNoneByDefault || element.classList.contains('DOM-slider-hidden') ? 'down' : 'up');
    var speed = slideSpeed ? slideSpeed : slideSpeed === 0 ? 0 : 300;
    var boxSizing = computedStyle.getPropertyValue('box-sizing');
    var paddingTop = parseInt(computedStyle.getPropertyValue('padding-top').split('px')[0]);
    var paddingBottom = parseInt(computedStyle.getPropertyValue('padding-bottom').split('px')[0]);
    var contentHeight = Math.max(element.scrollHeight - paddingTop - paddingBottom, 0);

    if (boxSizing === 'border-box') {
      contentHeight = Math.max(element.scrollHeight, 0);
    }

    if (element.dataset.sliding) {
      return Promise.resolve(element);
    }

    if (slideDirection === 'down' && !isDisplayNoneByDefault && !element.classList.contains('DOM-slider-hidden')) {
      return Promise.resolve(element);
    }

    if (slideDirection === 'up' && element.classList.contains('DOM-slider-hidden')) {
      return Promise.resolve(element);
    }

    element.dataset.sliding = true;
    element.setAttribute('aria-hidden', slideDirection === 'down' ? 'false' : 'true');

    if (slideDirection === 'down' && isDisplayNoneByDefault) {
      element.classList.add('DOM-slider-hidden');
      element.style.display = visibleDisplayValue;
      contentHeight = element.scrollHeight;
    } // a fixed height is required in order to animate the height


    element.style.height = "".concat(contentHeight, "px");
    element.style.transition = "all ".concat(speed, "ms ").concat(easing || '');
    element.style.overflow = 'hidden';
    return new Promise(function (resolve) {
      setTimeout(function () {
        // begin the animation
        element.classList.toggle('DOM-slider-hidden');
        resolve();
      }, +delay > 20 ? +delay : 20);
    }).then(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          element.style.removeProperty('height');
          element.style.removeProperty('transition');
          element.style.removeProperty('overflow');
          element.removeAttribute('data-sliding');
          resolve(element);
        }, speed);
      });
    });
  }

  function initPrintStyles() {
    var hiddenElements;

    function showContent() {
      hiddenElements = document.querySelectorAll('.DOM-slider-hidden');
      hiddenElements.forEach(function (element) {
        element.classList.remove('DOM-slider-hidden');
      });
    }

    function hideContent() {
      hiddenElements.forEach(function (element) {
        element.classList.add('DOM-slider-hidden');
      });
    }

    window.onbeforeprint = showContent;
    window.onafterprint = hideContent;
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
        showContent();
        setTimeout(hideContent, 500);
      }
    });
  }
})();
