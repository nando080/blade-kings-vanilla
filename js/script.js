const burgerButtonEl = document.querySelector('.l-hero__burger-button')
const navBarEl = document.querySelector('.l-hero__navbar')
const navLinksEl = document.querySelectorAll('.l-hero__nav-link')
const slidesEl = document.querySelectorAll('.l-about__slide')
const slideButtonsEl = document.querySelectorAll('.l-about__button')
const galleryContainerEl = document.querySelector('.l-gallery__container')
const galleryTrackEl = document.querySelector('.l-gallery__track')
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

let changeSlideInterval = setInterval(() => {
    incrementSlideIndex()
    changeSlide()
}, slideChangeTime)

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

const createGalleryIndexButton = index => {
    const button = document.createElement('div')
    button.classList.add('l-gallery__button')
    button.dataset.gallery = index
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
    insertGalleryIndexButtonsIntoDOM()
})

insertGalleriesIntoDOM()
insertGalleryIndexButtonsIntoDOM()