/**
 * Pigmentalo - main TypeScript
 * JS minimale: solo comportamenti che CSS non può gestire
 */

import '../scss/main.scss'
import { initGalleries } from './components/gallery'

document.addEventListener('DOMContentLoaded', () => {
    initScrollHeader()
    initGalleries()
})

// ── Scroll header ─────────────────────────────────────────────────────────────

function initScrollHeader(): void {
    const header = document.querySelector<HTMLElement>('.wp-block-template-part')
    if (!header) return

    const onScroll = (): void => {
        header.classList.toggle('is-scrolled', window.scrollY > 20)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
}
