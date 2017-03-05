'use strict';

Array.from||(Array.from=function(){var a=Object.prototype.toString,b=function(b){return"function"==typeof b||"[object Function]"===a.call(b)},c=function(a){var b=Number(a);return isNaN(b)?0:0!==b&&isFinite(b)?(b>0?1:-1)*Math.floor(Math.abs(b)):b},d=Math.pow(2,53)-1,e=function(a){var b=c(a);return Math.min(Math.max(b,0),d)};return function(c){var d=this,f=Object(c);if(null==c)throw new TypeError("Array.from requires an array-like object - not null or undefined");var h,g=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof g){if(!b(g))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(h=arguments[2])}for(var l,i=e(f.length),j=b(d)?Object(new d(i)):new Array(i),k=0;k<i;)l=f[k],g?j[k]="undefined"==typeof h?g(l,k):g.call(h,l,k):j[k]=l,k+=1;return j.length=i,j}}());

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function slide(element, _speed, direction, easing) {
    // prevent user from sliding down if already sliding
    if (direction === 'down' && ([].concat(_toConsumableArray(element.classList)).some(function (e) {
        return new RegExp(/setHeight/).test(e);
    }) || !element.classList.contains('DOM-slider-hidden'))) return false;

    // prevent user from sliding up if already sliding
    if (direction === 'up' && (element.classList.contains('DOM-slider-hidden') || [].concat(_toConsumableArray(element.classList)).some(function (e) {
        return new RegExp(/setHeight/).test(e);
    }))) return false;

    var s = element.style;
    var speed = _speed ? _speed : _speed === 0 ? 0 : 300;
    var contentHeight = element.scrollHeight;

    // subtract padding from contentHeight
    if (direction === 'up') {
        var style = window.getComputedStyle(element);
        var paddingTop = +style.getPropertyValue('padding-top').split('px')[0];
        var paddingBottom = +style.getPropertyValue('padding-bottom').split('px')[0];
        contentHeight = element.scrollHeight - paddingTop - paddingBottom;
    }

    // create a setHeight CSS class
    var sheet = document.createElement('style');
    // create an id for each class to allow multiple elements to slide
    // at the same time, such as when activated by a forEach loop
    var setHeightId = (Date.now() * Math.random()).toFixed(0);
    sheet.innerHTML = '.setHeight-' + setHeightId + ' {height: ' + contentHeight + 'px;}';
    document.head.appendChild(sheet);

    // add the CSS classes that will give the computer a fixed starting point
    if (direction === 'up') {
        element.classList.add('setHeight-' + setHeightId);
    } else {
        element.classList.add('DOM-slider-hidden', 'setHeight-' + setHeightId);
    }

    s.transition = 'all ' + speed + 'ms ' + (easing || '');
    s.overflow = 'hidden';

    // add/remove the CSS class(s) that will animate the element
    if (direction === 'up') {
        // Don't know why, but waiting 10 milliseconds before adding
        // the 'hidden' class when sliding up prevents height-jumping
        setTimeout(function () {
            element.classList.add('DOM-slider-hidden');
        }, 10);
    } else {
        element.classList.remove('DOM-slider-hidden');
    }

    var done = new Promise(function (resolve, reject) {
        setTimeout(function () {
            // remove the temporary inline styles and remove the temp stylesheet
            element.removeAttribute('style');
            sheet.parentNode.removeChild(sheet);
            element.classList.remove('setHeight-' + setHeightId);
            resolve(element);
        }, speed);
    });

    return done;
}

(function DOMsliderInit() {
    var sheet = document.createElement('style');
    sheet.id = 'slideCSSClasses';
    sheet.innerHTML = '\n    .DOM-slider-hidden {\n        height: 0 !important;\n        padding-top: 0 !important;\n        padding-bottom: 0 !important;\n        border-top-width: 0 !important;\n        border-bottom-width: 0 !important;\n        margin-top: 0 !important;\n        margin-bottom: 0 !important;\n        overflow: hidden !important;\n    }\n    ';
    document.head.appendChild(sheet);

    Object.prototype.slideDown = function (_speed, easing) {
        return slide(this, _speed, 'down', easing);
    };

    Object.prototype.slideUp = function (_speed, easing) {
        return slide(this, _speed, 'up', easing);
    };

    Object.prototype.slideToggle = function (_speed, easing) {
        if (this.classList.contains('DOM-slider-hidden')) {
            return slide(this, _speed, 'down', easing);
        } else {
            return slide(this, _speed, 'up', easing);
        }
    };
})();
