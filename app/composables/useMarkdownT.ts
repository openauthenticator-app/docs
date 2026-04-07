import { useI18n } from 'vue-i18n'
import { marked } from 'marked'

/**
 * A composable that combines `t` and `marked`.
 */
export default function useMarkdownT() {
  const { t } = useI18n()
  return (key: string, parameters?: Record<string, unknown>) => {
    if (parameters?.block) {
      return marked.parse(t(key, parameters), { async: false })
    }
    return marked.parseInline(t(key, parameters ?? {}), { async: false })
  }
}
