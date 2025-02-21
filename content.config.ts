import { defineCollection } from '@nuxt/content'

export const collections = {
  vuejs: defineCollection({
    source: {
      include: 'README.md',
      repository: 'https://github.com/vuejs/core',
    },
    type: 'page'
  }),
  content: defineCollection({
    source: '**/*.md',
    type: 'page'
  })
} 
