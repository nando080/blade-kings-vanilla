const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')
const slidesEl = document.querySelectorAll('.l-about__slide')
const slideButtonsEl = document.querySelectorAll('.l-about__button')

//TODO PEGAR BOTÕES DO SLIDER E IMPLEMENTAR FUNCIONALIDADE

const slideChangeTime = 5000

let currentSlideIndex = 1

const incrementSlideIndex = () => {
    if (currentSlideIndex < slidesEl.length) {
        currentSlideIndex ++
    } else {
        currentSlideIndex = 1
    }
    console.log(currentSlideIndex);
}

const decrementSlideIndex = () => {
    if (currentSlideIndex > 1) {
        currentSlideIndex --
    } else {
        currentSlideIndex = 3
    }
    console.log(currentSlideIndex);
}

const changeSlide = () => {
    slidesEl.forEach(slide => {
        slide.classList.remove('is-active')
    })
    slidesEl[currentSlideIndex - 1].classList.add('is-active')
}

let changeSlideInterval = setInterval(() => {
    incrementSlideIndex()
    changeSlide()
}, slideChangeTime)

slideButtonsEl.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(changeSlideInterval)
        const typeButton = button.dataset.js
        if (typeButton === 'next') {
            incrementSlideIndex()
        }
        if (typeButton === 'prev') {
            decrementSlideIndex()
        }
        changeSlide()
        changeSlideInterval = setInterval(() => {
            incrementSlideIndex()
            changeSlide()
        }, slideChangeTime)
    })
})

burgerButtonEl.addEventListener('click', () => {
    burgerButtonEl.classList.toggle('is-active')
    navBarEl.classList.toggle('is-active')
})

console.log(slidesEl.length);