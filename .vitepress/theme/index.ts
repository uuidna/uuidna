// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import RefererCompass from './RefererCompass.vue'
import FoldAnimation from './FoldAnimation.vue'
import SiteFooter from './SiteFooter.vue'
import Reflect from './Reflect.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    // Global categorised footer on every page, via the layout-bottom slot.
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(SiteFooter),
    })
  },
  enhanceApp({ app }) {
    // Global — the theorem pages embed <RefererCompass /> to show a path-aware backlink (referer tracked client-side).
    app.component('RefererCompass', RefererCompass)
    // The 7d fold, animated — seven addresses fold to one receipt (self-contained SVG/CSS).
    app.component('FoldAnimation', FoldAnimation)
    // Reflect — a client-side content-addresser; the visitor's chosen data reflects to its address in the browser,
    // nothing sent or stored. Privacy by default; opt-in storage is a separate, consent-gated feature.
    app.component('Reflect', Reflect)
  }
} satisfies Theme
