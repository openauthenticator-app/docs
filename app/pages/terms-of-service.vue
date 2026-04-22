<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const markdownT = useMarkdownT()
const thirdPartyTermsKeys = [
  'googlePlayServices',
  'appleMediaServices',
  'cloudflare',
  'revenueCat',
  'google',
  'apple',
  'github',
  'microsoft',
  'logoDev',
  'brandfetch',
  'upLead',
  'wikimedia',
  'firebase',
]
watch(
  locale,
  () => usePageHead({ title: t('termsOfService.title.content') }),
  { immediate: true },
)
</script>

<template>
  <container class="pt-lg-5">
    <article>
      <section>
        <title-with-subtitle level="1">
          <template #before>
            <span class="fade-up-1">{{ t('termsOfService.title.lastUpdated') }}</span>
          </template>
          <span class="fade-up-2">{{ t('termsOfService.title.content') }}</span>
          <template #description>
            <p
              class="fade-up-3 mb-5"
              v-html="markdownT('termsOfService.intro')"
            />
          </template>
        </title-with-subtitle>
      </section>
      <section class="fade-up-4">
        <p v-html="markdownT('termsOfService.intro')" />
        <p v-html="markdownT('termsOfService.agreement')" />
        <p v-html="markdownT('termsOfService.modification')" />
        <p v-html="markdownT('termsOfService.dataProcessing')" />
        <p v-html="markdownT('termsOfService.thirdPartyTerms')" />
        <ul>
          <li
            v-for="key in thirdPartyTermsKeys"
            :key="key"
            v-html="markdownT(`termsOfService.thirdPartyTermsList.${key}`)"
          />
        </ul>
        <p v-html="markdownT('termsOfService.responsibility')" />
        <p v-html="markdownT('termsOfService.charges')" />
        <p v-html="markdownT('termsOfService.battery')" />
        <p v-html="markdownT('termsOfService.termination')" />
      </section>
      <section class="fade-up-5">
        <h2 v-html="markdownT('termsOfService.legalRiskResponsibility.title')" />
        <h3 v-html="markdownT('termsOfService.legalRiskResponsibility.noWarranty.title')" />
        <p v-html="markdownT('termsOfService.legalRiskResponsibility.noWarranty.content')" />
        <h3 v-html="markdownT('termsOfService.legalRiskResponsibility.synchronizationSecurity.title')" />
        <p v-html="markdownT('termsOfService.legalRiskResponsibility.synchronizationSecurity.content')" />
        <h3 v-html="markdownT('termsOfService.legalRiskResponsibility.releaseIndemnity.title')" />
        <p v-html="markdownT('termsOfService.legalRiskResponsibility.releaseIndemnity.content')" />
        <h3 v-html="markdownT('termsOfService.legalRiskResponsibility.limitationOfLiability.title')" />
        <p v-html="markdownT('termsOfService.legalRiskResponsibility.limitationOfLiability.content')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('termsOfService.changes.title')" />
        <p v-html="markdownT('termsOfService.changes.content')" />
        <p v-html="markdownT('termsOfService.changes.effectiveDate')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('termsOfService.contact.title')" />
        <p v-html="markdownT('termsOfService.contact.content')" />
      </section>
      <div class="fade-up-6 text-end">
        <small v-html="markdownT('termsOfService.credit')" />
      </div>
    </article>
  </container>
</template>

<style lang="scss" scoped>
@import 'assets/article';
</style>
