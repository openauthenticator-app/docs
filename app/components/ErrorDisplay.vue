<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const markdownT = useMarkdownT()

const props = defineProps<{
  error: any
}>()

const errorCode = computed(() => {
  if (props.error) {
    if (typeof props.error.toString === 'function' && /^-?\d+$/.test(props.error.toString())) {
      return parseInt(props.error.toString())
    }
    if (props.error.statusCode && /^-?\d+$/.test(props.error.statusCode)) {
      return parseInt(props.error.statusCode)
    }
  }
  return null
})
</script>

<template>
  <div>
    <title-with-subtitle>
      <template #before>
        <span class="fade-up-1">{{ t('error.title.before') }}</span>
      </template>
      <span
        v-if="errorCode === 404"
        class="fade-up-2"
      >
        {{ t('error.title.notFound') }}
      </span>
      <span
        v-else
        class="fade-up-2"
      >
        {{ t('error.title.content') }} <em v-if="errorCode">{{ errorCode }}</em>
      </span>
      <template #description>
        <p v-html="markdownT('error.description')" />
      </template>
    </title-with-subtitle>
    <p
      v-if="errorCode === 404"
      class="text-muted"
      v-html="markdownT('error.notFound')"
    />
    <details v-else>
      <pre>{{ error }}</pre>
    </details>
  </div>
</template>
