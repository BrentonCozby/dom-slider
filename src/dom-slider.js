function slide(options) {
    const {
        element,
        slideSpeed,
        direction,
        easing,
        delay
    } = options

    const styleSetter = element.style
    const computedStyle = window.getComputedStyle(element)
    const isDisplayNoneByDefault = computedStyle.display === 'none'
    const speed = (slideSpeed) ? slideSpeed : (slideSpeed === 0) ? 0 : 300

    let paddingTop = parseInt(computedStyle.getPropertyValue('padding-top').split('px')[0])
    let paddingBottom = parseInt(computedStyle.getPropertyValue('padding-bottom').split('px')[0])
    let contentHeight = element.scrollHeight

    if (isDisplayNoneByDefault) {
        styleSetter.display = 'block';
        contentHeight = element.scrollHeight - paddingTop - paddingBottom
    }

    // prevent user from sliding down if already sliding
    if (direction === 'down'
        && (
            [...element.classList].some(e => new RegExp(/DOM-slider-setHeight/).test(e))
            || !element.classList.contains('DOM-slider-hidden')
        )
        && !isDisplayNoneByDefault
    ) return Promise.resolve()

    // prevent user from sliding up if already sliding
    if (direction === 'up'
        && (
            element.classList.contains('DOM-slider-hidden')
            || [...element.classList].some(e => new RegExp(/DOM-slider-setHeight/).test(e))
        )
        && !isDisplayNoneByDefault
    ) return Promise.resolve()

    // subtract padding from contentHeight
    if (direction === 'up') {
        contentHeight = element.scrollHeight - paddingTop - paddingBottom
    }

    // create a setHeight CSS class
    const sheet = document.createElement('style')
    // create an id for each class to allow multiple elements to slide
    // at the same time, such as when activated by a forEach loop
    const setHeightId = (Date.now() * Math.random()).toFixed(0)
    sheet.innerHTML = `.DOM-slider-setHeight-${setHeightId} {height: ${contentHeight}px;}`
    document.head.appendChild(sheet)

    // add the CSS classes that will give the computer a fixed starting point
    if (direction === 'up') {
        element.classList.add(`DOM-slider-setHeight-${setHeightId}`)
    }
    else {
        element.classList.add('DOM-slider-hidden', `DOM-slider-setHeight-${setHeightId}`)
    }

    styleSetter.transition = `all ${speed}ms ${easing || ''}`
    styleSetter.overflow = 'hidden'

    // add/remove the CSS class(s) that will animate the element
    function animate() {
        return new Promise(function (resolve, reject) {
            if (direction === 'up') {
                // Don't know why, but waiting 10 milliseconds before adding
                // the 'hidden' class when sliding up prevents height-jumping
                setTimeout(function () {
                    element.classList.add('DOM-slider-hidden')
                    resolve()
                }, delay ? +delay + 10 : 10)
            }
            else {
                setTimeout(function () {
                    element.classList.remove('DOM-slider-hidden')
                    resolve()
                }, delay ? +delay + 10 : 10)
            }
        })
    }

    return animate()
    .then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // remove the temporary inline styles and remove the temp stylesheet
                if (!isDisplayNoneByDefault) {
                    element.removeAttribute('style')
                }
                element.classList.remove(`DOM-slider-setHeight-${setHeightId}`)
                sheet.parentNode.removeChild(sheet)
                resolve(element)
            }, speed)
        })
    })
}

function printStyles() {
    let hiddenElements;

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

    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
            showContent()
            setTimeout(hideContent, 500)
        };
    });
}

(function DOMsliderInit() {
    const sheet = document.createElement('style')
    sheet.id = 'slideCSSClasses'
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

    Object.prototype.slideDown = function (slideSpeed, easing, delay) {
        return slide({
            element: this,
            slideSpeed,
            direction: 'down',
            easing,
            delay
        })
    }

    Object.prototype.slideUp = function(slideSpeed, easing, delay) {
        return slide({
            element: this,
            slideSpeed,
            direction: 'up',
            easing,
            delay
        })
    }

    Object.prototype.slideToggle = function(slideSpeed, easing, delay, visibleDisplayValue) {
        const computedStyle = window.getComputedStyle(this)
        const displayValue = computedStyle.getPropertyValue('display')

        if (displayValue === 'none' || this.classList.contains('DOM-slider-hidden')) {
            return slide({
                element: this,
                slideSpeed,
                direction: 'down',
                easing,
                delay,
                visibleDisplayValue
            })
        } else {
            return slide({
                element: this,
                slideSpeed,
                direction: 'up',
                easing,
                delay
            })
        }
    }

    printStyles()
})()
