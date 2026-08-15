// docs/.vitepress/config.ts — uuidna VitePress Configuration
// Beautiful documentation site built from markdown

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'uuidna',
  description: 'Mathematics replaces money. Proof replaces authority. Theorems replace corruption.',

  head: [
    ['meta', { name: 'og:title', content: 'uuidna' }],
    ['meta', { name: 'og:description', content: 'A mathematically-proven economic system' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    siteTitle: '🪙 uuidna',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'School', link: '/school' },
      { text: 'Doctrine', link: '/doctrine' },
      { text: 'Theorems', link: '/theorems' },
    ],

    // The captain's four groups — the ONE categorization, same as the site footer (SiteFooter.vue).
    sidebar: {
      '/': [
        {
          text: 'The ledger',
          items: [
            { text: 'All theorems', link: '/theorems' },
            { text: 'Topics (by skill)', link: '/topics' },
            { text: 'The trials', link: '/trials' },
            { text: 'Games', link: '/games' },
          ],
        },
        {
          text: 'Fuse it in',
          items: [
            { text: 'The school', link: '/school' },
            { text: 'MCP tools', link: '/mcp' },
            { text: 'Chat', link: '/chat' },
            { text: 'Books', link: '/books' },
            { text: 'Guides', link: '/guides' },
          ],
        },
        {
          text: 'The captain',
          items: [
            { text: "The captain's coins", link: '/captain' },
            { text: 'The doctrine', link: '/doctrine' },
          ],
        },
        {
          text: 'Verify it yourself',
          items: [
            { text: 'The tests', link: '/tests' },
            { text: 'Analytics', link: '/analytics' },
            { text: 'Deploy', link: '/deploy' },
            { text: 'Changelog', link: '/changelog' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uuidna/uuidna' },
    ],

    footer: {
      message: '🪙 Mathematics replaces money. Proof replaces authority. Theorems replace corruption.',
      copyright: 'uuidna — All theorems sealed to ledger',
    },

    search: {
      provider: 'local',
    },
  },

  vite: {
    define: {
      __DEV__: 'true',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  build: {
    rollupOptions: {},
  },

  // The build IS the forensic: a deleted page that other pages still link to FAILS the build. NOTHING is ignored —
  // markdown links point at PAGES (the MCP-computed presentations: /theorem/<key>, /publications/<slug>), never at
  // raw served files, so the checker sees every link. The served assets (/lean/*.lean proofs, /seeds/*) are still
  // shipped and get their own forensic: copy-lean-to-site scans every built HTML page and FAILS if any /lean or
  // /seeds reference lacks a served file. Two forensics, zero ignores, zero blind spots.
  cleanUrls: true,
})
