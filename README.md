# DOM-slider
It works like jQuery's slideToggle(), slideDown(), &amp; slideUp(), but does not use display: none.
####Features:
* Slides elements with a known or *unknown* height
* Slides the content, padding, border, and margin (just the top and bottom values).
* May slide multiple elements at once
* Hides elements in a screen-reader-friendly way
* Zero Dependencies and written in plain JavaScript (compiled to ES5)

###Example Usage:
First, place the DOM-slider.js file in your code somewhere. Then do stuff like below:
```JavaScript
import 'dom-slider' // if using ES6 modules

const box = document.querySelector('.box')

box.slideToggle()

box.slideUp(1200)

box.slideDown(800, 'cubic-bezier(0.25, 0.1, 0.44, 1.4)')
```
###Install:
```
bower install dom-slider --save

npm install dom-slider --save
```


###Options:
No arguments required, but you may give 1 or 2 arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction)
```
