export function useShiki() {
  const { $shiki } = useNuxtApp()

  const highlight = async (code: string, lang?: string) => {
    return $shiki.codeToHtml(code, {
      lang: lang || 'text',
      theme: 'github-dark'
    })
  }

  return {
    highlight
  }
}
