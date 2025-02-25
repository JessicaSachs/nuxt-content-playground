import { defineCollection } from '@nuxt/content'

export const collections = {
  cli: defineCollection({
    source: {
      include: 'docs/**/*.md',
      repository: 'https://github.com/herodevs/cli',
    },
    type: 'page',
  }),
  content: defineCollection({
    source: '**/*.md',
    type: 'page'
  })
} 
