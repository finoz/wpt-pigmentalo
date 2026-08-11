interface CarouselMarkupOptions {
	el: HTMLElement
	hasArrows?: boolean
	hasDots?: boolean
}

/**
 * Trasforma il markup di wp:gallery in struttura Swiper.
 * Ogni figlio diretto dell'elemento diventa un .swiper-slide.
 */
const carouselHelper = {

	setMarkup({ el, hasArrows = true, hasDots = true }: CarouselMarkupOptions): void {
		el.classList.add('swiper')

		const wrapper = document.createElement('div')
		wrapper.classList.add('swiper-wrapper')

		while (el.firstChild) {
			wrapper.appendChild(el.firstChild)
		}

		Array.from(wrapper.children).forEach(child => {
			child.classList.add('swiper-slide')
		})

		el.appendChild(wrapper)

		if (hasArrows) {
			const prev = document.createElement('button')
			prev.type = 'button'
			prev.classList.add('swiper-button-prev')
			prev.setAttribute('aria-label', 'Immagine precedente')

			const next = document.createElement('button')
			next.type = 'button'
			next.classList.add('swiper-button-next')
			next.setAttribute('aria-label', 'Immagine successiva')

			el.appendChild(prev)
			el.appendChild(next)
		}

		if (hasDots) {
			const pagination = document.createElement('div')
			pagination.classList.add('swiper-pagination')
			el.appendChild(pagination)
		}
	},

}

export default carouselHelper
