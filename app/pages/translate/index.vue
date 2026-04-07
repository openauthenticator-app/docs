<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { LanguageWithData } from '~~/modules/get-info-from-github'
import LanguageCard from '~/components/Translation/LanguageCard.vue'
import Stats from '~/components/Stats/Stats.vue'
import Stat from '~/components/Stats/Stat.vue'

const { data: languages, status, error } = await useFetch<Record<string, LanguageWithData>>('/_app/languages.json')

const languagesCount = computed(() => Object.keys(languages.value ?? {}).length)
const filesCount = computed(() => Object.values(languages.value ?? {}).reduce((acc, language) => acc + language.files.length, 0))
const completeLanguagesCount = computed(() => Object.values(languages.value ?? {}).filter(language => language.progress === 1).length)
const incompleteLanguagesCount = computed(() => languagesCount.value - completeLanguagesCount.value)

const { t, locale } = useI18n()
const markdownT = useMarkdownT()
watch(
  locale,
  () => usePageHead({ title: t('translate.pageTitle') }),
  { immediate: true },
)
</script>

<template>
  <div>
    <container class="pt-lg-5">
      <title-with-subtitle level="1">
        <template #before>
          <span class="fade-up-1">{{ t('translate.title.before') }}</span>
        </template>
        <span
          class="fade-up-2"
          v-html="markdownT('translate.title.content')"
        />
        <template #description>
          <p
            class="fade-up-3 mb-3"
            v-html="markdownT('translate.description')"
          />
        </template>
      </title-with-subtitle>
    </container>
    <div v-if="status === 'pending'">
      <container>
        <spinner class="fade-up-1" />
      </container>
    </div>
    <div v-else-if="languages">
      <container
        class="fade-up-1 mb-5"
        vertical-padding="2"
        alternate
      >
        <stats>
          <stat
            :stat="languagesCount"
            :title="t('translate.stats.1')"
          />
          <stat
            :stat="filesCount"
            :title="t('translate.stats.2')"
          />
          <stat
            :stat="completeLanguagesCount"
            :title="t('translate.stats.3')"
          />
          <stat
            :stat="incompleteLanguagesCount"
            :title="t('translate.stats.4')"
          />
        </stats>
      </container>
      <container class="fade-up-2">
        <b-row>
          <b-col
            v-for="language in languages"
            :key="language.code"
            sm="12"
            md="4"
            class="mb-3"
          >
            <language-card :language="language" />
          </b-col>
        </b-row>
      </container>
    </div>
    <div v-else>
      <container>
        <error-display :error="error" />
      </container>
    </div>
  </div>
</template>
