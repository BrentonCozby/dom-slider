# slide-down-up-vanilla-js
Like jQuery's slideDown() &amp; slideUp(), but does not use display: none.

###Usage:
```JavaScript
// Adds slideDown and slideUp methods to Object.prototype, and creates a CSS class called '.hidden'
slideDownUpInit()

const content = document.querySelector('.content')

document.querySelector('.button').addEventListener('click', function() {

    if(content.classList.contains('hidden')) {
        content.slideDown(800, 'cubic-bezier(0.25, 0.1, 0.44, 1.4)')
    }
    else {
        content.slideUp(1200, 'ease')
    }

})
```
###Options:
No arguments are required, however, you may give up to 2 arguments to slideDown and slideUp:
```JavaScript
slideDown(speedInMilliseconds, CSSTransitionTimingFunction)
```
