const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')
const navLinksEl = document.querySelectorAll('.l-hero__nav-link')
const slidesEl = document.querySelectorAll('.l-about__slide')
const slideButtonsEl = document.querySelectorAll('.l-about__button')
const galleryContainerEl = document.querySelector('.l-gallery__container')
const galleryTrackEl = document.querySelector('.l-gallery__track')
const indexButtonsContainerEl = document.querySelector('.l-gallery__index-button-container')
const prevGalleryButtonEl = document.querySelector('.l-gallery__button--prev')
const nextGalleryButtonEl = document.querySelector('.l-gallery__button--next')
const lightBoxEl = document.querySelector('.c-lightbox')
const lightBoxImageEl = document.querySelector('.c-lightbox__img')
const lightBoxPrevButton = document.querySelector('.c-lightbox__button--prev')
const lightBoxNextButton = document.querySelector('.c-lightbox__button--next')
const formInputsEl = document.querySelectorAll('.l-schedule__input')
const formSubmitButtonEl = document.querySelector('[data-js="form-submit"]')

const slideChangeTime = 5000
const totalImagesInGalleries = 24

let currentSlideIndex = 1
let currentImageGallery = 1
let isLightBoxActive = false
let currentLightBoxImage = 1


/* SLIDES */

const incrementSlideIndex = () => {
    if (currentSlideIndex < slidesEl.length) {
        currentSlideIndex ++
    } else {
        currentSlideIndex = 1
    }
}

const decrementSlideIndex = () => {
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
}

let changeSlideInterval = setInterval(() => {
    incrementSlideIndex()
    changeSlide()
}, slideChangeTime)


/* IMAGE GALLERY */

const getSlideGalleryWidth = () => galleryContainerEl.getBoundingClientRect().width

const getNumberOfImagesPerGallery = () => {
    if (getSlideGalleryWidth() > 1140) {
        return 12
    } else if (getSlideGalleryWidth() > 840) {
        return 6
    } else {
        return 4
    }
}

const getNumberOfGalleries = () => totalImagesInGalleries / getNumberOfImagesPerGallery()


const createImageElement = index => {
    const imgElement = document.createElement('img')
    const formatedIndex = index >= 10 ? index : `0${index}`
    imgElement.src = `img/gallery/img-${formatedIndex}-thumb.jpg`
    imgElement.dataset.img = `${index}`
    imgElement.classList.add('l-gallery__img')
    imgElement.addEventListener('click', () => {
        showLightBox(index)
    })
    return imgElement
}

const createGallery = index => {
    const gallery = document.createElement('div')
    gallery.classList.add('l-gallery__item')
    gallery.dataset.gallery = `${index}`
    return gallery
}

const buildGalleries = () => {
    let currentImage = 1
    const galleries = []
    for (let galleryIndex = 0; galleryIndex < getNumberOfGalleries(); galleryIndex++) {
        const currentGallery = createGallery(galleryIndex + 1)
        for (let imageIndex = 0; imageIndex < getNumberOfImagesPerGallery(); imageIndex++) {
            currentGallery.appendChild(createImageElement(currentImage))
            currentImage++
        }
        galleries.push(currentGallery)
    }
    return galleries
}

const insertGalleriesIntoDOM = () => {
    galleryTrackEl.innerHTML = ''
    const allGalleries = buildGalleries()
    allGalleries.forEach(gallery => {
        galleryTrackEl.appendChild(gallery)
    })
}

const changeActiveGalleryButton = index => {
    document.querySelectorAll('.l-gallery__button--index').forEach(button => {
        button.classList.remove('is-active')
    })
    document.querySelectorAll('.l-gallery__button--index')[index - 1].classList.add('is-active')
}

const indexButtonGalleryClick = event => {
    const index = event.target.dataset.gallery
    changeImageGallery(index)
    indexButtonsContainerEl.querySelectorAll('.l-gallery__button').forEach(btn => {
        btn.classList.remove('is-active')
    })
    event.target.classList.add('is-active')
    currentImageGallery = Number(index)
}

const createGalleryIndexButton = index => {
    const button = document.createElement('div')
    button.classList.add('l-gallery__button')
    button.classList.add('l-gallery__button--index')
    button.dataset.gallery = index
    button.addEventListener('click', indexButtonGalleryClick)
    return button
}

const insertGalleryIndexButtonsIntoDOM = () => {
    const numberOfGalleries = getNumberOfGalleries()
    indexButtonsContainerEl.innerHTML = ''
    for (let i = 0; i < numberOfGalleries; i++) {
        const indexButton = createGalleryIndexButton(i + 1)
        if (i === 0) {
            indexButton.classList.add('is-active')
        }
        indexButtonsContainerEl.appendChild(indexButton)
    }
}

const changeImageGallery = index => {
    if (index !== currentImageGallery) {
        const displacement = getSlideGalleryWidth()
        const displacementOrientation = index > currentImageGallery ? '-' : '+'
        galleryTrackEl.style.transform = `translateX(calc(-${displacement * (index - 1)}px)`
        currentImageGallery = index
    }
}


/* LIGHTBOX */

const hideLightBox = () => {
    if (isLightBoxActive) {
        document.querySelector('body').classList.remove('is-locked')
        lightBoxEl.classList.remove('is-active')
        isLightBoxActive = false
    }
}

const showLightBox = index => {
    currentLightBoxImage = Number(index)
    const currentIndex = currentLightBoxImage < 10 ? `0${index}` : index
    lightBoxImageEl.src = `img/gallery/img-${currentIndex}.jpg`
    document.querySelector('body').classList.add('is-locked')
    lightBoxEl.classList.add('is-active')
    isLightBoxActive = true
}

const changeLightBoxImage = direction => {
    if (direction === 'prev') {
        if (currentLightBoxImage > 1) {
            currentLightBoxImage -= 1
            const currentImageIndex = currentLightBoxImage < 10 ? `0${currentLightBoxImage}` : currentLightBoxImage
            lightBoxImageEl.src = `img/gallery/img-${currentImageIndex}.jpg`
            return
        }
    }

    if (direction === 'next') {
        if (currentLightBoxImage < totalImagesInGalleries) {
            currentLightBoxImage += 1
            const currentImageIndex = currentLightBoxImage < 10 ? `0${currentLightBoxImage}` : currentLightBoxImage
            lightBoxImageEl.src = `img/gallery/img-${currentImageIndex}.jpg`
            return
        }
    }
}


/* FORM */

const formValidator = {
    nameErrorMessage: '*Digite um nome válido',
    phoneErrorMessage: '*Digite um número de celular válido',
    emailErrorMessage: '*Digite um endereço de e-mail válido',
    servicesErrorMessage: '*Selecione algum serviço',
    dateErrorMessage: '*Selecione uma data e horário válidos',

    showErrorMessage(input) {
        input.classList.add('l-schedule__input--error')
        const inputName = input.dataset.js
        const messagePlaceholder = input.parentNode.querySelector('.l-schedule__error-message')
        messagePlaceholder.innerText = formValidator[`${inputName}ErrorMessage`]
        messagePlaceholder.classList.add('is-active')
    },

    clearErrorMessage(input) {
        input.classList.remove('l-schedule__input--error')
        const messagePlaceholder = input.parentNode.querySelector('.l-schedule__error-message')
        messagePlaceholder.classList.remove('is-active')
    },

    //TODO tirar lógica do select
    isEmptyInput(input) {
        let isEmpty = false
        if (input.dataset.js === 'services') {
            if (input.selectedIndex === 0) {
                isEmpty = true;
            }
        } else {
            const condition = input.value === '' || input.value === null || input.value === undefined
            if (condition) {
                isEmpty = true
            }
        }
        return isEmpty
    },

    isNameValid(input) {
        let isNameOk = true
        if (this.isEmptyInput(input)) {
            isNameOk = false
            return isNameOk
        }
        if (input.value.length <= 2) {
            isNameOk = false
            return isNameOk
        }
        if (/\d/.test(input.value)) {
            isNameOk = false
            return isNameOk
        }
        return isNameOk
    },

    isPhoneValid(input) {
        let isPhoneOk = true
        const phoneRegEx =  /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
        if (this.isEmptyInput(input)) {
            isPhoneOk = false
            return isPhoneOk
        }
        if (!phoneRegEx.test(input.value)) {
            isPhoneOk = false
            return isPhoneOk
        }
        return isPhoneOk
    },

    isEmailValid(input) {
        let isEmailOk = true
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (this.isEmptyInput(input)) {
            isEmailOk = false
            return isEmailOk
        }
        if (!emailRegEx.test(input.value)) {
            isEmailOk = false
            return isEmailOk
        }
        return isEmailOk
    },

    isServicesValid(input) {
        return input.selectedIndex !== 0
    },

    isDateValid(input) {
        let isDateOk = true
        const inputDateValue = input.value
        if (this.isEmptyInput(input)) {
            isDateOk = false
            return isDateOk
        }
        const dateRegEx = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
        if (!dateRegEx.test(inputDateValue)) {
            isDateOk = false
            return isDateOk
        }
        const inputYear = Number(inputDateValue.slice(0, 4))
        const inputMonth = Number(inputDateValue.slice(5, 7))
        const inputDay = Number(inputDateValue.slice(8, 10))
        const inputHour = Number(inputDateValue.slice(11, 13))
        const inputMinute = Number(inputDateValue.slice(14, 16))
        console.log(inputYear, inputMonth, inputDay, inputHour, inputMinute, inputDateValue)
        if (inputYear < Number(new Date().getFullYear())) {
            isDateOk = false
            return isDateOk
        }
        if (inputYear === Number(new Date().getFullYear()) && (inputMonth - 1) < Number(new Date().getMonth())) {
            isDateOk = false
            return isDateOk
        }
        if (inputMonth - 1 === Number(new Date().getMonth()) && inputDay < Number(new Date().getDate())) {
            isDateOk = false
            return isDateOk
        }
        if (inputDay === Number(new Date().getDate()) && inputHour < Number(new Date().getHours())) {
            isDateOk = false
            return isDateOk
        }
        if (inputHour === Number(new Date().getHours()) && inputMinute < Number(new Date().getMinutes())) {
            isDateOk = false
            return isDateOk
        }
        return isDateOk
    }
}


/* EVENTS */

formSubmitButtonEl.addEventListener('click', event => {
    event.preventDefault()
    const test = formValidator.isDateValid(formInputsEl[4])
    console.log(test)
})

lightBoxPrevButton.addEventListener('click', () => {
    changeLightBoxImage('prev')
})

lightBoxNextButton.addEventListener('click', () => {
    changeLightBoxImage('next')
})

lightBoxEl.addEventListener('click', event => {
    if (event.target.classList.contains('c-lightbox')) {
        hideLightBox()
    }
})

window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        hideLightBox()
    }
})

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

navLinksEl.forEach(link => {
    link.addEventListener('click', () => {
        burgerButtonEl.classList.remove('is-active')
    navBarEl.classList.remove('is-active')
    })
})

prevGalleryButtonEl.addEventListener('click', () => {
    let currentIndex = 0
    if (currentImageGallery > 0) {
        currentIndex = currentImageGallery - 1
    } else {
        currentIndex = 0
    }
    changeImageGallery(currentIndex)
    if (currentIndex >= 1) {
        changeActiveGalleryButton(currentIndex)
    }
})

nextGalleryButtonEl.addEventListener('click', () => {
    let currentIndex = 0
    if (currentImageGallery < getNumberOfGalleries()) {
        currentIndex = currentImageGallery + 1
    } else {
        currentIndex = getNumberOfGalleries()
    }
    changeImageGallery(currentIndex)
    changeActiveGalleryButton(currentIndex)
})

window.addEventListener('resize', () => {
    insertGalleriesIntoDOM()
    insertGalleryIndexButtonsIntoDOM()
})

insertGalleriesIntoDOM()
insertGalleryIndexButtonsIntoDOM()