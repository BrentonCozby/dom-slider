# DOM-slider
It works like jQuery's slideToggle(), slideDown(), &amp; slideUp(), but does not use display: none.
Uses CSS3 transitions and element.scrollHeight to animate the height of elements with an unknown height.

###Features:
* Slides elements with a known or *unknown* height
* Slides the height, padding, border, and margin (just the top and bottom values).
* May slide multiple elements at once
* Returns a Promise resolved with the element
* Hides elements in a screen-reader-friendly way
* Zero Dependencies and written in plain JavaScript (compiled to ES5)

###Example Usage:
First, place the DOM-slider.js file in your code somewhere. Then do stuff like below:
```JavaScript
import 'dom-slider' // if using ES6 modules

const box = document.querySelector('.box')

box.slideToggle()

box.slideUp(1200)

box.slideDown(800, 'easeInOut')

box.slideDown(500).then(box => box.slideUp(300))
```
###Install:
```
bower install dom-slider --save

npm install dom-slider --save
```
or include a script tag with the file served from a CDN:
```HTML
<script src="https://cdn.rawgit.com/BrentonCozby/DOM-slider/7defae4e/dist/DOM-slider.js"></script>
```


###Options:
No arguments required, but you may give 1 or 2 arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction)
```
