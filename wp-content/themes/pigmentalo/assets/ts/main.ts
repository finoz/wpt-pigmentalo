/**
 * Lomais - main TypeScript
 * JS minimale: solo comportamenti che CSS non può gestire
 */

import '../scss/main.scss'
import { initGalleries } from './components/gallery'

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle()
  initScrollHeader()
  initGalleries()
})

// ── Navigation mobile toggle ──────────────────────────────────────────────────
//
// Markup generato da parts/navigation.php:
//   nav.site-header__nav > button.site-nav__toggle + ul.site-nav__menu
//
// Accessibilità:
//   - aria-expanded sul bottone comunica lo stato agli screen reader
//   - display: none (via CSS + .nav-is-open) esclude il menu
//     dall'accessibility tree quando chiuso
//   - Escape chiude e riporta il focus al bottone
//   - Click fuori chiude

function initNavToggle(): void {
  const btn = document.querySelector<HTMLButtonElement>('.site-nav__toggle')
  if (!btn) return

  const nav  = btn.closest<HTMLElement>('.site-header__nav')
  const menu = document.getElementById('site-nav-menu')
  if (!nav || !menu) return

  const open = (): void => {
    btn.setAttribute('aria-expanded', 'true')
    nav.classList.add('nav-is-open')
    menu.querySelector<HTMLElement>('a')?.focus()
  }

  const close = (): void => {
    btn.setAttribute('aria-expanded', 'false')
    nav.classList.remove('nav-is-open')
    btn.focus()
  }

  btn.addEventListener('click', () => {
    btn.getAttribute('aria-expanded') === 'true' ? close() : open()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-is-open')) close()
  })

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-is-open') && !nav.contains(e.target as Node)) close()
  })
}

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
