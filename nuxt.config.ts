// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  content: {
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
  }
})
