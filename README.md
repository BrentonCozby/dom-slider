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
First, place the dom-slider.js file in your code somewhere. Hide all those elements that you want to slide down/toggle using `display: none` in CSS. Then do stuff like below:

```JavaScript
import 'dom-slider' // if using ES6 modules

const box = document.querySelector('.box')

box.slideToggle()

box.slideUp(1200)

box.slideDown(800, 'easeInOut')

box.slideDown(500).slideUp(300)

box.slideUp().then(function() {
  console.log('Done sliding!')
})
```
### Install:
```
npm install --save dom-slider
```

### Options:
No arguments required, but you may give the following arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction, delayInMilliseconds, visibleDisplayValue)
```

### Print Styling:
dom-slider removes the DOM-slider-hidden CSS class from all elements before printing.
