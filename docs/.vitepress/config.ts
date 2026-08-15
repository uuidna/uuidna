// .vitepress/config.ts — Captain Coins VitePress Configuration
// Beautiful documentation site built from markdown

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Captain Coins',
  description: 'Mathematics replaces money. Proof replaces authority. Theorems replace corruption.',

  head: [
    ['meta', { name: 'og:title', content: 'Captain Coins' }],
    ['meta', { name: 'og:description', content: 'A mathematically-proven economic system' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    siteTitle: '🪙 Captain Coins',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guides', link: '/guides' },
      { text: 'Docs', link: '/legal-quantum-framework' },
      { text: 'Theorems', link: '/theorems' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Guides', link: '/guides' },
            { text: 'Chat', link: '/chat' },
          ],
        },
        {
          text: 'Documentation',
          items: [
            { text: 'Legal Framework', link: '/legal-quantum-framework' },
            { text: 'Economics Proof', link: '/no-money-needed-proof' },
            { text: 'Corruption Proof', link: '/corruption-proof-society' },
            { text: 'What We Replace', link: '/uuidna-replaces-detailed' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Theorems', link: '/theorems' },
            { text: 'Topics', link: '/topics' },
            { text: 'The tests', link: '/tests' },
            { text: 'Deploy', link: '/deploy' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/uuidna/uuidna' },
    ],

    footer: {
      message: '🪙 Mathematics replaces money. Proof replaces authority. Theorems replace corruption.',
      copyright: 'Captain Coins — All theorems sealed to ledger',
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
