import { createI18n } from 'vue-i18n'
import de from '~/locales/de.json'
import en from '~/locales/en.json'
import es from '~/locales/es.json'
import fr from '~/locales/fr.json'
import it from '~/locales/it.json'
import pt from '~/locales/pt.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    ssr: true,
    messages: {
      de,
      en,
      es,
      fr,
      it,
      pt,
    },
  })

  nuxtApp.vueApp.use(i18n)

  if (import.meta.client) {
    const savedLocale = useCookie<string>('locale')
    const { availableLocales, locale } = i18n.global

    onNuxtReady(() => {
      const browserLocale = navigator.language.split('-')[0]
      const preferredLocale = [savedLocale.value, browserLocale]
        .find(code => code && availableLocales.includes(code))
      if (preferredLocale) {
        locale.value = preferredLocale
      }

      watch(locale, newLocale => savedLocale.value = newLocale)
    })
  }
})
