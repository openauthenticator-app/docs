<script setup lang="ts">
import type { NuxtError } from '#app'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const props = defineProps<{ error: NuxtError }>()

const title = computed(() => {
  let result = t('error.title.content')
  if ((Object.hasOwnProperty.call(props.error, 'statusCode'))) {
    result += ` ${props.error.statusCode}`
  }
  return result
})

onMounted(() => console.error(props.error))

watch (
  title,
  newTitle => usePageHead({ title: newTitle }),
  { immediate: true },
)

watch(
  locale,
  () => usePageHead({ title: title.value }),
  { immediate: true },
)
</script>

<template>
  <nuxt-layout>
    <container class="pt-lg-5 pb-lg-5">
      <error-display :error="error" />
    </container>
  </nuxt-layout>
</template>
