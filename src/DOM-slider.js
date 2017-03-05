function slide(element, _speed, direction, easing) {
    // prevent user from sliding down if already sliding
    if(direction === 'down'
        && (
            element.classList.contains('setHeight')
            || !element.classList.contains('DOM-slider-hidden')
        )
    ) return false

    // prevent user from sliding up if already sliding
    if(direction === 'up'
        && (
            element.classList.contains('DOM-slider-hidden')
            || element.classList.contains('setHeight')
        )
    ) return false

    const s = element.style
    const speed = (_speed) ? _speed : (_speed === 0) ? 0 : 300
    let contentHeight = element.scrollHeight

    // subtract padding from contentHeight
    if(direction === 'up') {
        const style = window.getComputedStyle(element)
        const paddingTop = +style.getPropertyValue('padding-top').split('px')[0]
        const paddingBottom = +style.getPropertyValue('padding-bottom').split('px')[0]
        contentHeight = element.scrollHeight - paddingTop - paddingBottom
    }

    // create a setHeight CSS class
    const sheet = document.createElement('style')
    // create an id for each class to allow multiple elements to slide
    // at the same time, such as when activated by a forEach loop
    const setHeightId = (Date.now() * Math.random()).toFixed(0)
    sheet.innerHTML = `.setHeight-${setHeightId} {height: ${contentHeight}px;}`
    document.head.appendChild(sheet)

    // add the CSS classes that will give the computer a fixed starting point
    if(direction === 'up') {
        element.classList.add(`setHeight-${setHeightId}`)
    }
    else {
        element.classList.add('DOM-slider-hidden', `setHeight-${setHeightId}`)
    }

    s.transition = `all ${speed}ms ${easing || ''}`
    s.overflow = 'hidden'

    // add/remove the CSS class(s) that will animate the element
    if(direction === 'up') {
        // Don't know why, but waiting 10 milliseconds before adding
        // the 'hidden' class when sliding up prevents height-jumping
        setTimeout(function() {
            element.classList.add('DOM-slider-hidden')
        }, 10)
    }
    else {
        element.classList.remove('DOM-slider-hidden')
    }

    let done = new Promise(function(resolve, reject) {
        setTimeout(function() {
            // remove the temporary inline styles and remove the temp stylesheet
            element.removeAttribute('style')
            sheet.parentNode.removeChild(sheet)
            element.classList.remove(`setHeight-${setHeightId}`)
            resolve(element)
        }, speed)
    })

    return done
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

    Object.prototype.slideDown = function(_speed, easing) {
        return slide(this, _speed, 'down', easing)
    }

    Object.prototype.slideUp = function(_speed, easing) {
        return slide(this, _speed, 'up', easing)
    }

    Object.prototype.slideToggle = function(_speed, easing) {
        if(this.classList.contains('DOM-slider-hidden')) {
            return slide(this, _speed, 'down', easing)
        }
        else {
            return slide(this, _speed, 'up', easing)
        }

    }
})()
