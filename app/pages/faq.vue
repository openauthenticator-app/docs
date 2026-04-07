<script setup lang="ts">
import { useI18n } from 'vue-i18n'

type Category = 'security' | 'privacy' | 'subscription' | 'platforms'

const { t, te, locale } = useI18n()
const markdownT = useMarkdownT()
watch(
  locale,
  () => usePageHead({ title: t('faq.pageTitle') }),
  { immediate: true },
)

const emojiOfCategory = (category: Category) => {
  switch (category) {
    case 'security':
      return '🔐'
    case 'privacy':
      return '🗄️'
    case 'subscription':
      return '💳'
    case 'platforms':
      return '🐧'
  }
}
const categoriesOfQuestion = (questionIndex: number): Category[] => {
  switch (questionIndex) {
    case 1:
      return ['security']
    case 2:
      return ['privacy']
    case 3:
      return ['subscription']
    case 4:
      return ['security']
    case 5:
      return ['platforms']
    case 6:
      return ['platforms']
    default:
      return []
  }
}
const questions = computed(() => {
  const result = []
  for (let i = 1; te(`faq.questions.${i}.question`); i++) {
    result.push({
      question: t(`faq.questions.${i}.question`),
      answer: markdownT(`faq.questions.${i}.answer`, { block: true }),
      categories: categoriesOfQuestion(i),
    })
  }
  return result
})

const currentCategory = ref<Category | null>(null)
const visible = ref(false)

onMounted(() => {
  visible.value = window.innerWidth > 768
})
</script>

<template>
  <div>
    <container class="pt-lg-5">
      <title-with-subtitle level="1">
        <template #before>
          <span class="fade-up-1">{{ t('faq.title.lastUpdated') }}</span>
        </template>
        <span
          class="fade-up-2"
          v-html="markdownT('faq.title.content')"
        />
        <template #description>
          <p class="fade-up-3 mb-5">
            {{ t('faq.description') }}
          </p>
        </template>
      </title-with-subtitle>
      <div class="fade-up-4 d-flex flex-wrap gap-2 mb-5">
        <b-button
          v-for="category in [null, 'security', 'privacy', 'subscription', 'platforms'] as (Category | null)[]"
          :key="`button-${category}`"
          :variant="category === currentCategory ? 'primary' : 'secondary'"
          size="sm"
          @click="currentCategory = category"
        >
          {{ t('faq.categories.' + (category ?? 'all')) }}
        </b-button>
      </div>
      <b-accordion
        id="questions"
        class="fade-up-5"
        free
      >
        <b-accordion-item
          v-for="(question, index) in questions"
          :id="`question-${index + 1}`"
          :key="`question-${index + 1}`"
          :visible="visible"
          header-tag="span"
          :class="{ 'd-none': currentCategory && !question.categories.includes(currentCategory) }"
        >
          <template #title>
            <span class="number">{{ (index + 1).toString().padStart(2, '0') }}</span>
            {{ question.question }}
          </template>
          <div
            class="answer"
            v-html="question.answer"
          />
          <div class="d-flex flex-wrap gap-2 mt-3">
            <b-button
              v-for="category in categoriesOfQuestion(index + 1)"
              :key="`question-${index + 1}-category-${category}`"
              size="sm"
              variant="outline-primary"
              disabled
            >
              {{ emojiOfCategory(category) }} {{ t('faq.categories.' + (category ?? 'all')) }}
            </b-button>
          </div>
        </b-accordion-item>
      </b-accordion>
    </container>
    <container
      class="position-relative text-center"
      alternate
    >
      <blurred-stain class="z-0" />
      <div class="position-relative z-1">
        <title-with-subtitle level="3">
          <template #before>
            {{ t('faq.questionLeft.title.before') }}
          </template>
          {{ t('faq.questionLeft.title.content') }}
          <template #description>
            <p class="mb-5">
              {{ t('faq.questionLeft.description') }}
            </p>
          </template>
        </title-with-subtitle>
        <b-button
          to="/contact/"
          variant="primary"
        >
          <icon name="heroicons:at-symbol" /> {{ t('faq.questionLeft.askButton') }}
        </b-button>
      </div>
    </container>
  </div>
</template>

<style lang="scss" scoped>
#questions {
  .answer {
    :deep(em) {
      color: white;
    }

    > *:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
