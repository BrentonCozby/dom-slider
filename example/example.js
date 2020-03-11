const {slideToggle, slideUp, slideDown} = window.domSlider

const box = document.querySelector('.box')
const content = document.querySelector('.content')
const paragraphs = document.querySelectorAll('.content p')

const slideDownButton = document.querySelector('.slide-down-button')
const slideUpButton = document.querySelector('.slide-up-button')
const slideToggleButton = document.querySelector('.slide-toggle-button')
const toggleParagraphsButton = document.querySelector('.toggle-paragraphs-button')
const faqs = document.querySelector('.faqs')

slideToggleButton.addEventListener('click', function() {
    slideToggle({element: box})
})

faqs.addEventListener('click', function(e) {
    const nextSibling = e.target.nextElementSibling;

    if (!nextSibling.classList.contains('faq-answer')) {
        return false
    }

    slideToggle({element: nextSibling})
})


slideDownButton.addEventListener('click', function() {
    slideDown({element: content, slideSpeed: 800})
})

slideUpButton.addEventListener('click', function() {
    slideUp({element: content, slideSpeed: 1200, easing: 'ease'})
})

toggleParagraphsButton.addEventListener('click', function () {
    Promise.all(Array.from(paragraphs).reverse().map((p, i) => {
        return slideUp({element: p, slideSpeed: 500, delay: 200 * i})
    }))
    .then(() => {
        paragraphs.forEach((p, i) => {
            slideDown({
                element: p,
                slideSpeed: 500 * (i + 1),
                easing: 'cubic-bezier(0.25, 0.1, 0.44, 1.4)',
                delay: 200 * i
            })
        })
    })
})
