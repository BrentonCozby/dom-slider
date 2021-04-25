const {slideToggle, slideUp, slideDown} = window.domSlider

const box = document.querySelector('.box')
const content = document.querySelector('.content')
const paragraphs = document.querySelectorAll('.content p')

const slideDownButton = document.querySelector('.slide-down-button')
const slideUpButton = document.querySelector('.slide-up-button')
const slideToggleButton = document.querySelector('.slide-toggle-button')
const toggleParagraphsButton = document.querySelector('.toggle-paragraphs-button')
const faqs = document.querySelector('.faqs')
const addFaqButton = document.querySelector('.add-faq-button')

slideToggleButton.addEventListener('click', function() {
    const newBoxParagraph = document.createElement('p')
    newBoxParagraph.textContent = 'Hello World'
    box.appendChild(newBoxParagraph)

    slideToggle({element: box})
})

faqs.addEventListener('click', function(e) {
    const nextSibling = e.target.nextElementSibling;

    if (!nextSibling.classList.contains('faq-answer')) {
        return false
    }

    slideToggle({element: nextSibling})
})

addFaqButton.addEventListener('click', function() {
    const newFaq = document.createElement('li')

    newFaq.innerHTML = `
    <li>
        <h4>FAQ #4</h4>
        <p class="faq-answer">This is the answer to FAQ #4.</p>
    </li>
    `

    faqs.appendChild(newFaq)

    addFaqButton.style.display = 'none';
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
