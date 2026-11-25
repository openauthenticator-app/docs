import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'url'
import * as path from 'path'
import StylelintPlugin from 'vite-plugin-stylelint'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

import { siteMeta } from './app/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'nuxt-cname-generator',
    '@nuxt/icon',
    'nuxt-link-checker',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@bootstrap-vue-next/nuxt',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: [
    '~/assets/app.scss',
  ],

  site: {
    url: siteMeta.url,
    name: siteMeta.name,
    trailingSlash: true,
  },

  build: {
    transpile: ['vue-i18n'],
  },

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },

  compatibilityDate: '2024-07-01',

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  vite: {
    plugins: [
      StylelintPlugin(),
      VueI18nVitePlugin({
        strictMessage: false,
        include: [
          path.resolve(path.dirname(fileURLToPath(import.meta.url)), './locales/*.json'),
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['if-function', 'color-functions', 'global-builtin', 'import'],
        },
      },
    },
  },

  cname: {
    host: siteMeta.url,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'DM Serif Display', provider: 'google', weights: [400], styles: ['normal', 'italic'] },
      { name: 'DM Mono', provider: 'google', weights: [400, 500], styles: ['normal'] },
      { name: 'Outfit', provider: 'google', weights: [300, 400, 500, 600], styles: ['normal'], global: true },
    ],
  },

  icon: {
    provider: 'iconify',
    class: 'vue-icon',
  },

  linkChecker: {
    failOnError: false,
    skipInspections: [
      'link-text',
      'no-uppercase-chars',
    ],
  },
})
