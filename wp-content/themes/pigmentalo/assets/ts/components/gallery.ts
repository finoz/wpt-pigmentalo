import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper'
import { Navigation, Pagination, A11y, Keyboard } from 'swiper/modules'
import carouselHelper from '../utils/carouselHelper'

// ── Tipi ─────────────────────────────────────────────────────────────────────

interface CarouselOptions {
	hasArrows: boolean
	hasDots: boolean
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function getCarouselOptions(el: HTMLElement): CarouselOptions {
	return {
		hasArrows: el.classList.contains('is-style-carousel') ||
		           el.classList.contains('is-style-carousel-arrows'),
		hasDots:   el.classList.contains('is-style-carousel') ||
		           el.classList.contains('is-style-carousel-dots'),
	}
}

function initCarousel(galleryEl: HTMLElement): void {
	const { hasArrows, hasDots } = getCarouselOptions(galleryEl)

	// Crea un container interno che diventa il vero Swiper.
	// La gallery WP porta classi come is-layout-flex che interferiscono con
	// il calcolo delle dimensioni di Swiper. Il wrapper isola Swiper da tutto.
	const inner = document.createElement('div')
	inner.classList.add('gallery-carousel__inner')
	while (galleryEl.firstChild) {
		inner.appendChild(galleryEl.firstChild)
	}
	galleryEl.appendChild(inner)

	carouselHelper.setMarkup({ el: inner, hasArrows, hasDots })

	new Swiper(inner, {
		modules: [Navigation, Pagination, A11y, Keyboard],
		loop: true,
		slidesPerView: 1,
		speed: 400,
		a11y: { enabled: true },
		keyboard: { enabled: true, onlyInViewport: true },
		...(hasArrows && {
			navigation: {
				nextEl: inner.querySelector<HTMLElement>('.swiper-button-next') ?? undefined,
				prevEl: inner.querySelector<HTMLElement>('.swiper-button-prev') ?? undefined,
			},
		}),
		...(hasDots && {
			pagination: {
				el: inner.querySelector<HTMLElement>('.swiper-pagination') ?? undefined,
				type: 'bullets',
				clickable: true,
			},
		}),
	})
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function buildLightboxDialog(): HTMLDialogElement {
	const dialog = document.createElement('dialog')
	dialog.classList.add('gallery-lightbox')
	dialog.setAttribute('aria-label', 'Galleria immagini')
	dialog.innerHTML = `
		<button class="gallery-lightbox__close" type="button" aria-label="Chiudi galleria"></button>
		<div class="gallery-lightbox__swiper"></div>
	`
	document.body.appendChild(dialog)
	return dialog
}

function initGridLightbox(gallery: HTMLElement): void {
	const figures = Array.from(gallery.querySelectorAll<HTMLElement>('.wp-block-image'))
	if (!figures.length) return

	const dialog  = buildLightboxDialog()
	const swiperEl = dialog.querySelector<HTMLElement>('.gallery-lightbox__swiper')!
	const closeBtn = dialog.querySelector<HTMLButtonElement>('.gallery-lightbox__close')!

	let swiperInstance: Swiper | null = null

	const buildSlides = (): void => {
		swiperEl.innerHTML = ''
		swiperEl.classList.add('swiper')

		const wrapper = document.createElement('div')
		wrapper.classList.add('swiper-wrapper')

		figures.forEach(figure => {
			const img = figure.querySelector('img')
			if (!img) return

			const slide = document.createElement('div')
			slide.classList.add('swiper-slide')

			// usa href del link se presente (immagine full-size)
			const cloned = img.cloneNode(true) as HTMLImageElement
			const link = figure.querySelector<HTMLAnchorElement>('a')
			if (link?.href) {
				cloned.src    = link.href
				cloned.srcset = ''
				cloned.sizes  = ''
			}
			slide.appendChild(cloned)

			const caption = figure.querySelector('figcaption')
			if (caption?.textContent) {
				const cap = document.createElement('p')
				cap.classList.add('gallery-lightbox__caption')
				cap.textContent = caption.textContent
				slide.appendChild(cap)
			}

			wrapper.appendChild(slide)
		})

		const prevBtn = document.createElement('button')
		prevBtn.type = 'button'
		prevBtn.classList.add('swiper-button-prev')
		prevBtn.setAttribute('aria-label', 'Immagine precedente')

		const nextBtn = document.createElement('button')
		nextBtn.type = 'button'
		nextBtn.classList.add('swiper-button-next')
		nextBtn.setAttribute('aria-label', 'Immagine successiva')

		swiperEl.appendChild(wrapper)
		swiperEl.appendChild(prevBtn)
		swiperEl.appendChild(nextBtn)
	}

	const openAt = (index: number): void => {
		buildSlides()
		dialog.showModal()

		swiperInstance?.destroy(true, true)
		swiperInstance = new Swiper(swiperEl, {
			modules: [Navigation, A11y, Keyboard],
			initialSlide: index,
			loop: figures.length > 1,
			speed: 300,
			a11y: { enabled: true },
			keyboard: { enabled: true, onlyInViewport: false },
			navigation: {
				nextEl: swiperEl.querySelector<HTMLElement>('.swiper-button-next') ?? undefined,
				prevEl: swiperEl.querySelector<HTMLElement>('.swiper-button-prev') ?? undefined,
			},
		})
	}

	const close = (): void => {
		dialog.close()
		swiperInstance?.destroy(true, true)
		swiperInstance = null
	}

	// click su thumbnail
	figures.forEach((figure, index) => {
		figure.style.cursor = 'pointer'
		figure.addEventListener('click', e => {
			e.preventDefault()
			openAt(index)
		})
	})

	closeBtn.addEventListener('click', close)

	// click sullo sfondo del dialog
	dialog.addEventListener('click', e => {
		if (e.target === dialog) close()
	})
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function initGalleries(): void {
	const carouselSelectors = [
		'.is-style-carousel',
		'.is-style-carousel-arrows',
		'.is-style-carousel-dots',
	]

	carouselSelectors.forEach(selector => {
		document.querySelectorAll<HTMLElement>(selector).forEach(el => {
			initCarousel(el)
		})
	})

	document.querySelectorAll<HTMLElement>('.is-style-grid-lightbox').forEach(el => {
		initGridLightbox(el)
	})
}
