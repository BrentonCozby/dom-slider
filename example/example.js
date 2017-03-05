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

toggleParagraphsButton.addEventListener('click', function() {
    paragraphs.forEach(p => {
        p.slideUp(600)
        .then(p => p.slideDown(400, 'cubic-bezier(0.25, 0.1, 0.44, 1.4)'))
    })
})
