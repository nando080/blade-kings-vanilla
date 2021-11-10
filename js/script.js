const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')

burgerButtonEl.addEventListener('click', () => {
    burgerButtonEl.classList.toggle('is-active')
    navBarEl.classList.toggle('is-active')
})
