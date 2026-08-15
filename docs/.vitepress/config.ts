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
      { text: 'Doctrine', link: '/doctrine' },
      { text: 'Guides', link: '/guides' },
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

  ignoreDeadLinks: true,

  cleanUrls: true,
})
