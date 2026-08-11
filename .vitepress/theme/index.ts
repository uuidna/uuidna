// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import RefererCompass from './RefererCompass.vue'
import FoldAnimation from './FoldAnimation.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app }) {
    // Global — the theorem pages embed <RefererCompass /> to show a path-aware backlink (referer tracked client-side).
    app.component('RefererCompass', RefererCompass)
    // The 7d fold, animated — seven addresses fold to one receipt (self-contained SVG/CSS).
    app.component('FoldAnimation', FoldAnimation)
  }
} satisfies Theme
