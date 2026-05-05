import { createI18n } from 'vue-i18n'
import de from '~/locales/de.json'
import en from '~/locales/en.json'
import fr from '~/locales/fr.json'
import it from '~/locales/it.json'
import pt from '~/locales/pt.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    ssr: true,
    messages: {
      de,
      en,
      fr,
      it,
      pt,
    },
  })

  vueApp.use(i18n)
})
