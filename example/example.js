const box = document.querySelector('.box')
const content = document.querySelector('.content')
const paragraphs = document.querySelectorAll('.content p')

const slideDownButton = document.querySelector('.slide-down-button')
const slideUpButton = document.querySelector('.slide-up-button')
const slideToggleButton = document.querySelector('.slide-toggle-button')
const toggleParagraphsButton = document.querySelector('.toggle-paragraphs-button')

slideToggleButton.addEventListener('click', function() {
    box.slideToggle()
})

slideDownButton.addEventListener('click', function() {
    content.slideDown(800)
})

slideUpButton.addEventListener('click', function() {
    content.slideUp(1200, 'ease')
})

toggleParagraphsButton.addEventListener('click', function () {
    Promise.all(Array.from(paragraphs).reverse().map((p, i) => {
        return p.slideUp(500, null, 200 * i)
    }))
    .then(() => {
        paragraphs.forEach((p, i) => {
            p.slideDown(
                500 * (i + 1),
                'cubic-bezier(0.25, 0.1, 0.44, 1.4)',
                200 * i
            )
        })
    })
})
