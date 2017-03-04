# slide-down-up-vanilla-js
Like jQuery's slideDown() &amp; slideUp(), but does not use display: none.

###Example Usage:
```JavaScript
// Adds slideToggle, slideDown, and slideUp methods to Object.prototype
// and creates a CSS class called '.hidden'
slideDownUpInit()  // This line is required

box.slideToggle()

box.slideUp(1200)

box.slideDown(800, 'cubic-bezier(0.25, 0.1, 0.44, 1.4)')
```
###Options:
No arguments required, but you may give 1 or 2 arguments to slideToggle, slideDown, and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction)
```
