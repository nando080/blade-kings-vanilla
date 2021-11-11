const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')
const slidesEl = document.querySelectorAll('.l-about__slide')

//TODO PEGAR BOTÕES DO SLIDER E IMPLEMENTAR FUNCIONALIDADE

const slideChangeTime = 5000

let currentSlideIndex = 1

const increaseSlideIndex = () => {
    if (currentSlideIndex < slidesEl.length) {
        currentSlideIndex ++
    } else {
        currentSlideIndex = 1
    }
}

const decreaseSlideIndex = () => {
    if (currentSlideIndex > 1) {
        currentSlideIndex --
    } else {
        currentSlideIndex = 3
    }
}

const changeSlide = () => {
    slidesEl.forEach(slide => {
        slide.classList.remove('is-active')
    })
    slidesEl[currentSlideIndex - 1].classList.add('is-active')
    increaseSlideIndex()
}

const changeSlideInTime = setInterval( () => {
    changeSlide()
}, slideChangeTime)

burgerButtonEl.addEventListener('click', () => {
    burgerButtonEl.classList.toggle('is-active')
    navBarEl.classList.toggle('is-active')
})


console.log(slideButtonsEl);