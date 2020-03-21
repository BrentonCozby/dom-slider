# dom-slider
[![Known Vulnerabilities](https://snyk.io/test/github/brentoncozby/dom-slider/badge.svg?targetFile=package.json)](https://snyk.io/test/github/brentoncozby/dom-slider?targetFile=package.json)

It works like jQuery's slideToggle(), slideDown(), &amp; slideUp(), but does not use display: none.
Uses CSS3 transitions and element.scrollHeight to animate the height of elements with an unknown height.

[**dom-fader**](https://github.com/BrentonCozby/dom-fader) is a thing too.

### Features:
* Slides elements with a known or *unknown* height
* Slides the height, padding, border, and margin (just the top and bottom values).
* May slide multiple elements at once
* Returns a Promise resolved with the element
* Hides elements in a screen-reader-friendly way
* Zero Dependencies and written in plain JavaScript (compiled to ES5)

### Example Usage:
[dom-slider CDN link](https://rawcdn.githack.com/BrentonCozby/dom-slider/d44e567fd52fb07019be3f0f2ec0f8bdffe271c1/dist/dom-slider.js)

First, place the dom-slider CDN link in your html file above your own JavaScript files. Hide all the elements that you want to slide down/toggle using `display: none` in CSS. Then do stuff like below:

```JavaScript
const {slideDown, slideUp, slideToggle} = window.domSlider

const box = document.querySelector('.box')

slideToggle({element: box})

slideUp({element: box, slideSpeed: 1200})

slideDown({element: box, slideSpeed: 800, easing: 'easeInOut'})

// Promises (or async/await)
slideDown({element: box, slideSpeed: 500}).then(() => {
  slideUp({element: box, slideSpeed: 300})
})
```

### Options:
The `element` argument is required, but you may provide the following optional arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown({
  element,
  slideSpeed, // speed in milliseconds
  easing, // CSS transition timing function,
  delay, // delay in milliseconds,
  visibleDisplayValue, // the CSS display value when the element is visible; the default value is "block"
})
```

### Print Styling:
dom-slider removes the DOM-slider-hidden CSS class from all elements before printing and adds them back after printing.
