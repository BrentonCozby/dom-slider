# dom-slider
It works like jQuery's slideToggle(), slideDown(), &amp; slideUp(), but does not use display: none.
Uses CSS3 transitions and element.scrollHeight to animate the height of elements with an unknown height.

[**dom-fader**](https://github.com/BrentonCozby/dom-fader) is a thing too.

###Features:
* Slides elements with a known or *unknown* height
* Slides the height, padding, border, and margin (just the top and bottom values).
* May slide multiple elements at once
* Returns a Promise resolved with the element
* Hides elements in a screen-reader-friendly way
* Zero Dependencies and written in plain JavaScript (compiled to ES5)

###Example Usage:
First, place the dom-slider.js file in your code somewhere. Then do stuff like below:
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
###Install:
```
bower install dom-slider --save

npm install dom-slider --save
```
or include a script tag with the file served from a CDN:
```HTML
<script src="https://cdn.rawgit.com/BrentonCozby/dom-slider/5af8b397/dist/dom-slider.js"></script>
```

###Options:
No arguments required, but you may give 1 or 2 arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction)
```

###Print Styling:
dom-slider removes the DOM-slider-hidden CSS class from all elements before printing.
