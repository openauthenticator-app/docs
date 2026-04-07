<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const markdownT = useMarkdownT()
watch(
  locale,
  () => usePageHead({ title: t('privacyPolicy.title.content') }),
  { immediate: true },
)
</script>

<template>
  <container class="pt-lg-5">
    <article>
      <section>
        <title-with-subtitle level="1">
          <template #before>
            <span class="fade-up-1">{{ t('privacyPolicy.title.lastUpdated') }}</span>
          </template>
          <span class="fade-up-2">{{ t('privacyPolicy.title.content') }}</span>
          <template #description>
            <p
              class="fade-up-3 mb-5"
              v-html="markdownT('privacyPolicy.intro')"
            />
          </template>
        </title-with-subtitle>
      </section>
      <section class="fade-up-4">
        <h2 v-html="markdownT('privacyPolicy.userProvidedInfo.title')" />
        <p v-html="markdownT('privacyPolicy.userProvidedInfo.content')" />
      </section>
      <section class="fade-up-4">
        <h2 v-html="markdownT('privacyPolicy.automaticallyCollectedInfo.title')" />
        <p v-html="markdownT('privacyPolicy.automaticallyCollectedInfo.content')" />
      </section>
      <section class="fade-up-4">
        <h2 v-html="markdownT('privacyPolicy.locationInfo.title')" />
        <p v-html="markdownT('privacyPolicy.locationInfo.content')" />
      </section>
      <section class="fade-up-4">
        <h2 v-html="markdownT('privacyPolicy.thirdPartyAccess.title')" />
        <p v-html="markdownT('privacyPolicy.thirdPartyAccess.content')" />
      </section>
      <section class="fade-up-5">
        <h2 v-html="markdownT('privacyPolicy.thirdPartyProviders.title')" />
        <p v-html="markdownT('privacyPolicy.thirdPartyProviders.content')" />
        <ul>
          <li v-html="markdownT('privacyPolicy.thirdPartyProviders.list.googlePlayServices')" />
          <li v-html="markdownT('privacyPolicy.thirdPartyProviders.list.revenueCat')" />
        </ul>
        <p v-html="markdownT('privacyPolicy.thirdPartyProviders.content')" />
      </section>
      <section class="fade-up-5">
        <h2 v-html="markdownT('privacyPolicy.disclosure.title')" />
        <p v-html="markdownT('privacyPolicy.disclosure.content')" />
        <ul>
          <li v-html="markdownT('privacyPolicy.disclosure.list.1')" />
          <li v-html="markdownT('privacyPolicy.disclosure.list.2')" />
          <li v-html="markdownT('privacyPolicy.disclosure.list.3')" />
        </ul>
      </section>
      <section class="fade-up-5">
        <h2 v-html="markdownT('privacyPolicy.optOut.title')" />
        <p v-html="markdownT('privacyPolicy.optOut.content')" />
      </section>
      <section class="fade-up-5">
        <h2 v-html="markdownT('privacyPolicy.dataRetention.title')" />
        <p v-html="markdownT('privacyPolicy.dataRetention.content')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('privacyPolicy.children.title')" />
        <p v-html="markdownT('privacyPolicy.children.content')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('privacyPolicy.security.title')" />
        <p v-html="markdownT('privacyPolicy.security.content')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('privacyPolicy.changes.title')" />
        <p v-html="markdownT('privacyPolicy.changes.content')" />
        <p v-html="markdownT('privacyPolicy.changes.effectiveDate')" />
      </section>
      <section class="fade-up-6">
        <h2 v-html="markdownT('privacyPolicy.contact.title')" />
        <p v-html="markdownT('privacyPolicy.contact.content')" />
      </section>
      <div class="fade-up-6 text-end">
        <small v-html="markdownT('privacyPolicy.credit')" />
      </div>
    </article>
  </container>
</template>

<style lang="scss" scoped>
@import 'assets/article';
</style>
