// https://nuxt.com/docs/api/configuration/nuxt-config
import { globby } from 'globby'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Get all markdown files and convert them to routes
const contentFiles = await globby(['content/**/*.md'], {
  cwd: __dirname
})

const pagesFiles = await globby(['pages/**/*.vue'], {
  cwd: __dirname
})

const routes = contentFiles.map(file => 
  '/' + file
    .replace(/^content\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
)

const pagesRoutes = pagesFiles.map(file => 
  '/' + file
    .replace(/^pages\//, '')
    .replace(/\.vue$/, '')
).filter(route => !route.includes('['))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  content: {
    renderer: {
      anchorLinks: false
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          preload: [
            'json',
            'js',
            'ts',
            'html',
            'css',
            'vue',
            'shell',
            'markdown',
            // 'yaml',
            'bash'
          ]
        }
      }
    }
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', ...routes, ...pagesRoutes],
      crawlLinks: false
    }
  }
})
