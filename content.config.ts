import { defineCollection } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    source: '**/*.md',
    type: 'page'
  })
} 
