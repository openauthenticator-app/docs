<script setup lang="ts">
import type { BaseColorVariant } from 'bootstrap-vue-next'
import type { LanguageWithData } from '~~/modules/get-info-from-github'

const props = defineProps<{
  language: LanguageWithData
}>()

const progress = ref<number>(0)

onMounted(() => {
  setTimeout(() => progress.value = props.language.progress, 500)
})

const flagEmoji = computed<string>(() => {
  switch (props.language.code) {
    case 'en':
      return '🇬🇧'
    case 'fr':
      return '🇫🇷'
    case 'de':
      return '🇩🇪'
    case 'it':
      return '🇮🇹'
    case 'pt':
      return '🇵🇹'
    case 'es':
      return '🇪🇸'
    default:
      return '?'
  }
})

const variant = computed<keyof BaseColorVariant>(() => {
  if (props.language.progress >= 0.75) {
    return 'success'
  }
  if (props.language.progress >= 0.5) {
    return 'warning'
  }
  return 'danger'
})
const animate = ref<boolean>(false)
</script>

<template>
  <nuxt-link
    class="locale-link"
    :to="`/translate/${language.code}/`"
    @mouseover="animate = true"
    @mouseleave="animate = false"
  >
    <div class="d-flex align-items-center mb-2">
      <span class="flag p-1">
        {{ flagEmoji }}
      </span>
      <div class="flex-fill">
        <span class="d-block">
          {{ language.name }}
        </span>
        <span class="code">
          {{ language.code }}
        </span>
      </div>
      <pill>
        {{ Math.round(language.progress * 100) }}%
      </pill>
    </div>
    <b-progress
      class="progress"
      :max="1"
      striped
      :animated="animate"
      :value="progress"
      :variant="variant"
    />
  </nuxt-link>
</template>

<style lang="scss" scoped>
@import 'assets/bootstrap-mixins';
@import 'assets/colors';

.locale-link {
  display: block;
  text-decoration: none;
  background-color: var(--bs-tertiary-bg);
  padding: 1.5rem 2rem;
  transition: background-color 0.2s;
  color: var(--bs-body-color);

  @include border;
  @include rounded;

  .flag {
    $size: 20px;

    display: inline-block;
    font-size: $size;
    margin-right: 0.5em;
    height: fit-content;

    @include rounded;
    @include border;
  }

  .code {
    font-family: var(--bs-font-monospace), monospace;
    color: var(--bs-secondary-color);
    font-size: 0.8em;
  }

  .progress {
    width: 100%;

    :deep(.progress-bar) {
      transition-duration: 800ms;
      transition-property: width;
      transition-timing-function: ease-in-out;
    }
  }

  &:hover {
    background-color: $green-glow;
  }
}
</style>
