const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')
const navLinksEl = document.querySelectorAll('.l-hero__nav-link')
const slidesEl = document.querySelectorAll('.l-about__slide')
const slideButtonsEl = document.querySelectorAll('.l-about__button')
const galleryContainerEl = document.querySelector('.l-gallery__container')
const indexButtonsContainerEl = document.querySelector('.l-gallery__index-button-container')

const slideChangeTime = 5000
const totalImagesInGalleries = 24

let currentSlideIndex = 1

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

const getNumberOfImagesPerGallery = size => {
    if (size >= 1140) {
        return 12
    }else if (size >= 820) {
        return 6
    } else {
        return 4
    }
}

const getImageGalleryContainerSize = () => galleryContainerEl.getBoundingClientRect().width

const getCurrentNumberOfGalleries = () => 
    totalImagesInGalleries / getNumberOfImagesPerGallery(getImageGalleryContainerSize())

const buildImageGalleries = () => {
    let currentImage = 1

    const images = []

    for (let i = 0; i < getCurrentNumberOfGalleries(); i++) {
        let imageString = ''
        for (let j = 0; j < getNumberOfImagesPerGallery(getImageGalleryContainerSize()); j++) {
            const currentIndex = currentImage >= 10 ? currentImage : `0${currentImage}`
            imageString += `
            <img class="l-gallery__image" src="img/gallery/img-${currentIndex}-thumb.jpg" data-index="${currentImage}">
            `
            currentImage++
        }
        images.push(imageString)
    }

    const galleriesString = images.reduce((accumulator, image) => {
        return accumulator + `
        <div class="l-gallery__image-gallery">${image}</div>
        `
    }, '')

    return galleriesString
}

const insertGalleriesIntoDOM = () => {
    galleryContainerEl.innerHTML = buildImageGalleries()
}

const createIndexButton = index => {
    const indexBtn = document.createElement("div")
    indexBtn.classList.add('l-gallery__button')
    indexBtn.dataset.index = index
    return indexBtn
}

const fillIndexButtonContainer = () => {
    indexButtonsContainerEl.innerHTML = ''
    for (let i = 0; i < getCurrentNumberOfGalleries(); i++) {
        indexButtonsContainerEl.appendChild(createIndexButton(i + 1))
    }
}

console.log(createIndexButton(1))

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

navLinksEl.forEach(link => {
    link.addEventListener('click', () => {
        burgerButtonEl.classList.remove('is-active')
    navBarEl.classList.remove('is-active')
    })
})

window.addEventListener('resize', () => {
    insertGalleriesIntoDOM()
    fillIndexButtonContainer()
})

insertGalleriesIntoDOM()
fillIndexButtonContainer()