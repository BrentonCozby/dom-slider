(function () {
  'use strict';

  let styleCache = {}

  initDomSlider()
  initPrintStyles()

  function initDomSlider() {
    const sheet = document.createElement('style')
    sheet.id = 'dom-slider'
    sheet.innerHTML = `
      .DOM-slider-hidden {
        height: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        border-top-width: 0 !important;
        border-bottom-width: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        overflow: hidden !important;
      }
    `
    document.head.appendChild(sheet)

    function slideDown({element, slideSpeed, easing, delay, visibleDisplayValue}) {
      return slide({
        element,
        slideSpeed,
        direction: 'down',
        easing,
        delay,
        visibleDisplayValue
      })
    }

    function slideUp({element, slideSpeed, easing, delay}) {
      return slide({
        element,
        slideSpeed,
        direction: 'up',
        easing,
        delay
      })
    }

    function slideToggle({element, slideSpeed, easing, delay, visibleDisplayValue}) {
      return slide({
        element,
        slideSpeed,
        easing,
        delay,
        visibleDisplayValue
      })
    }

    window.domSlider = {
      slideDown,
      slideUp,
      slideToggle
    }
  }

  function slide({
    element,
    slideSpeed,
    direction,
    easing,
    delay = 0,
    visibleDisplayValue = 'block'
  }) {
    const domSliderId = element.dataset.domSliderId || (Date.now() * Math.random()).toFixed(0)

    if (!element.dataset.domSliderId) {
      element.dataset.domSliderId = domSliderId
    }

    if (!styleCache[domSliderId]) {
      styleCache[domSliderId] = {}
    }

    const cachedStyle = styleCache[domSliderId]
    const computedStyle = window.getComputedStyle(element)
    const isDisplayNoneByDefault = computedStyle.getPropertyValue('display') === 'none'
    const slideDirection = direction || (isDisplayNoneByDefault || element.classList.contains('DOM-slider-hidden') ? 'down' : 'up')
    const speed = slideSpeed ? slideSpeed : (slideSpeed === 0) ? 0 : 300

    let paddingTop = parseInt(computedStyle.getPropertyValue('padding-top').split('px')[0])
    let paddingBottom = parseInt(computedStyle.getPropertyValue('padding-bottom').split('px')[0])
    let contentHeight = Math.max(element.scrollHeight - paddingTop - paddingBottom, 0)

    if (element.dataset.sliding) {
      return Promise.resolve(element)
    }

    if (slideDirection === 'down' && !isDisplayNoneByDefault && !element.classList.contains('DOM-slider-hidden')) {
      return Promise.resolve(element)
    }

    if (slideDirection === 'up' && element.classList.contains('DOM-slider-hidden')) {
      return Promise.resolve(element)
    }

    element.dataset.sliding = true

    if (slideDirection === 'down' && isDisplayNoneByDefault) {
      element.classList.add('DOM-slider-hidden')
      element.style.display = visibleDisplayValue
      contentHeight = element.scrollHeight
    }

    // a fixed height is required in order to animate the height
    element.style.height = `${cachedStyle.height ? cachedStyle.height : contentHeight}px`
    element.style.transition = `all ${speed}ms ${easing || ''}`
    element.style.overflow = 'hidden'

    return new Promise(function (resolve) {
      setTimeout(function () {
        // begin the animation
        element.classList.toggle('DOM-slider-hidden')
        resolve()
      }, delay ? +delay : 0)
    })
    .then(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          element.style.removeProperty('height')
          element.style.removeProperty('transition')
          element.style.removeProperty('overflow')
          element.removeAttribute('data-sliding')

          styleCache[domSliderId].height = contentHeight

          resolve(element)
        }, speed)
      })
    })
  }

  function initPrintStyles() {
    let hiddenElements

    function showContent() {
      hiddenElements = document.querySelectorAll('.DOM-slider-hidden')
      hiddenElements.forEach(element => {
        element.classList.remove('DOM-slider-hidden')
      })
    }

    function hideContent() {
      hiddenElements.forEach(element => {
        element.classList.add('DOM-slider-hidden')
      })
    }

    window.onbeforeprint = showContent
    window.onafterprint = hideContent

    const mediaQueryList = window.matchMedia('print')
    mediaQueryList.addListener(function (mql) {
      if (mql.matches) {
          showContent()
          setTimeout(hideContent, 500)
      }
    })
  }
})()
