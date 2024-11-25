import { createHighlighterCore } from 'shiki/core'
import { getHighlighter } from 'shiki'

export default defineNuxtPlugin(async () => {
  const highlighter = await getHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [
      'javascript', 'typescript', 'html', 
      'css', 'vue', 'shellscript', 'markdown', 'bash'
    ]
  })

  return {
    provide: {
      shiki: highlighter
    }
  }
}) 
