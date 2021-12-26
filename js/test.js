const inputs = document.querySelectorAll('.l-schedule__input')
const btn = document.querySelector('input.c-cta-button')
/* console.log(inputs, btn) */


btn.addEventListener('click', event => {
    event.preventDefault()
    inputs.forEach((input, index) => {
        if (index === 3) {
            /* console.log(input.options, input.selectedIndex, input.options[input.selectedIndex], input.options[input.selectedIndex].text) */
            /* console.log(input.options[input.selectedIndex].text)
            return */
        }
        /* console.log(input.value) */
    })
    /*  event.preventDefault()
    inputs[0].classList.add('l-schedule__input--error')
    inputs[0].parentNode.querySelector('.l-schedule__error-message').classList.add('is-active') */
})