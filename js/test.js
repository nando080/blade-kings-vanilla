const inputs = document.querySelectorAll('.l-schedule__input')
const btn = document.querySelector('input.c-cta-button')
/* console.log(inputs, btn) */


/* 2021-12-08T12:06 */

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

const regTest = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
const phone = '(34)99246-4151'

const dataTeste = '2021-12-08T12:06'
const regExData = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
const dataAtual = new Date()
/* console.log(dataAtual.getFullYear())
console.log(dataAtual.getMonth())
console.log(dataAtual.getDay())
console.log(dataAtual.getHours())
console.log(dataAtual.getMinutes()) */
const ano = dataTeste.slice(0, 4)
const mes = dataTeste.slice(5, 7)
const dia = dataTeste.slice(8, 10)
const hora = dataTeste.slice(11, 13)
const minutos = dataTeste.slice(14, 16)
/* console.log(ano, mes, dia, hora, minutos); */

/* const string1 = 'teste'
console.log(string1.charAt(0))
console.log(string1.slice(1))
const string2 = string1.charAt(0).toUpperCase() + string1.slice(1)
console.log(string2) */