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
    logo: '🪙',
    siteTitle: 'Captain Coins',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vision', link: '/vision' },
      { text: 'School', link: '/quantum-school' },
      { text: 'Docs', link: '/legal-quantum-framework' },
      { text: 'Theorems', link: '/theorems' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Vision & Purpose', link: '/vision' },
            { text: 'How It Works', link: '/how-it-works' },
          ],
        },
        {
          text: 'Quantum School',
          items: [
            { text: 'Enrollment', link: '/quantum-school' },
            { text: 'Bachelor Program', link: '/bachelor-program' },
            { text: 'Master Program', link: '/master-program' },
            { text: 'Doctor Program', link: '/doctor-program' },
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
            { text: 'Standards', link: '/standards' },
            { text: 'Architecture', link: '/architecture' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anthropics/uuidna' },
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

  outDir: './site',

  cleanUrls: true,
})
