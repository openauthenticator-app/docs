<script setup lang="ts">
import dot from 'dot-object'
import { useI18n } from 'vue-i18n'
import type { LanguageWithData } from '~~/modules/get-info-from-github'
import { checkComplete, fromJson, generateJson, type TranslationData, type TranslationFile, } from '~/components/Translation/Table.vue'

interface RawTranslationFile {
  fileName: string
  data: Record<string, string>
}

const { t, locale } = useI18n()
const markdownT = useMarkdownT()
const route = useRoute()
const language = computed<string>(() => route.params.language!.toString())

watch(
  locale,
  () => usePageHead({ title: t('translate.pageTitle') }),
  { immediate: true },
)

const {
  data: languagesData,
  status: languagesStatus,
  error: languagesError,
} = await useFetch<Record<string, LanguageWithData>>('/_app/languages.json')

const fetchTranslationFiles = async (language: string): Promise<Record<string, RawTranslationFile>> => {
  const result: Record<string, RawTranslationFile> = {}
  if (!languagesData.value) {
    return result
  }
  if (!(language in languagesData.value)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Language does not exist yet.',
    })
  }
  const files = languagesData.value[language]?.files ?? []
  for (const fileName of files) {
    const content = await $fetch(`/_app/${language}/${fileName}`)
    result[fileName] = {
      fileName: fileName,
      data: dot.dot(content),
    }
  }
  return result
}

const originalLanguageCode = 'en'
const {
  data: files,
  status: filesStatus,
  error: filesError,
} = await useAsyncData<TranslationFile[]>(
  `translation-table-${originalLanguageCode}-${language.value}`,
  async () => {
    const result: TranslationFile[] = []
    const originalLanguage = await fetchTranslationFiles(originalLanguageCode)
    const translation = await fetchTranslationFiles(language.value)
    for (const fileName in originalLanguage) {
      const rawTranslationFile = originalLanguage[fileName]!
      const data: TranslationData = {}
      for (const key in rawTranslationFile.data) {
        data[key] = {
          key: key,
          originalValue: rawTranslationFile.data[key]!,
          translatedValue: translation[fileName]?.data[key] ?? '',
        }
      }
      result.push({
        fileExists: !(!translation[fileName]),
        fileName: rawTranslationFile.fileName,
        targetLanguage: language.value,
        data: data,
        complete: checkComplete(data),
      })
    }
    return result
  },
  {
    watch: [languagesData],
    deep: true,
  },
)

const showModal = ref<boolean>(false)
const modalFile = ref<TranslationFile | undefined>()
const openTranslationModal = (file?: TranslationFile | undefined) => {
  modalFile.value = file
  showModal.value = true
}

const load = (index: number) => {
  const element = document.createElement('input')
  element.setAttribute('type', 'file')
  element.setAttribute('accept', 'application/json')
  element.style.display = 'none'
  element.addEventListener(
    'change',
    (event) => {
      // @ts-expect-error Event type doesn't exist in TS.
      const file = event.target?.files[0]
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result?.toString()
        if (content && files.value) {
          try {
            const currentData = files.value[index]!.data
            const data = fromJson(content, (key: string) => currentData[key]?.originalValue)
            files.value[index]!.data = data
            files.value[index]!.complete = checkComplete(data)
          }
          catch (ex) {
            console.error(ex)
            alert('An error occurred while loading the given file.')
          }
        }
      }
      reader.readAsText(file)
    },
    false,
  )
  element.click()
}

const download = (index: number) => {
  if (!files.value) {
    return
  }
  const translationFile = files.value[index]!
  const element = document.createElement('a')
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(generateJson(translationFile.data)))
  element.setAttribute('download', translationFile.fileName)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

const hasChanged = ref<boolean>(false)
const router = useRouter()
const removeGuard = router.beforeEach((to, from, next) => {
  if (!hasChanged.value) {
    next()
    return
  }
  const confirmation = confirm(t('translate.unsavedChanges'))
  if (confirmation) {
    next()
  }
})
onUnmounted(removeGuard)
</script>

<template>
  <container class="pt-lg-5 pb-lg-5">
    <div v-if="filesStatus === 'pending' || languagesStatus === 'pending'">
      <spinner class="fade-up-1" />
    </div>
    <div v-else-if="files">
      <title-with-subtitle level="1">
        <template #before>
          <nuxt-link
            class="fade-up-1"
            to="/translate/"
          >
            {{ t('translate.goBack') }}
          </nuxt-link>
        </template>
        <span class="fade-up-2">
          {{ languagesData![language]!.name }}
        </span>
        <template #description>
          <p
            class="fade-up-3"
            v-html="markdownT('translate.languageDescription')"
          />
        </template>
      </title-with-subtitle>
      <div class="fade-up-4">
        <nuxt-link
          class="back-button"
          to="/translate/"
        >
          {{ t('translate.notYourLanguage') }}
        </nuxt-link>
        <div class="d-flex flew-row gap-2 align-items-center mt-3 mb-5 font-monospace">
          <b-progress
            class="flex-fill"
            :max="1"
            striped
            :value="languagesData![language]!.progress"
          />
          {{ Math.round(languagesData![language]!.progress * 100) }}%
        </div>
      </div>
      <b-accordion class="fade-up-5">
        <b-accordion-item
          v-for="(file, index) in files"
          :id="file.fileName"
          :key="file.fileName"
          :title="file.fileName"
          header-tag="span"
        >
          <template #title>
            <span class="number">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>
            {{ file.fileName }}
          </template>
          <translation-table
            v-model="files[index]"
            @update:model-value="hasChanged = true"
          />
          <b-row class="mb-0 mb-md-5">
            <b-col class="d-flex align-items-center mb-2 mb-md-0">
              <div class="d-flex flex-row gap-2">
                <b-button
                  variant="outline-primary"
                  @click="load(index)"
                >
                  <icon name="bi:upload" /> {{ t('translate.accordion.load') }}
                </b-button>
                <b-button
                  variant="outline-primary"
                  @click="download(index)"
                >
                  <icon name="bi:download" /> {{ t('translate.accordion.save') }}
                </b-button>
              </div>
            </b-col>
            <b-col class="d-flex align-items-center justify-content-end">
              <b-button
                class="w-100 w-md-auto"
                variant="primary"
                :disabled="!files[index]!.complete"
                @click="openTranslationModal(files[index])"
              >
                <icon name="bi:check-lg" />
                {{ t('translate.accordion.submit') }} <span class="font-monospace">{{ file.fileName }}</span>
              </b-button>
            </b-col>
          </b-row>
        </b-accordion-item>
        <translation-modal
          v-if="modalFile"
          v-model="showModal"
          :file="modalFile"
        />
      </b-accordion>
    </div>
    <div v-else>
      <error-display :error="filesError ?? languagesError" />
    </div>
  </container>
</template>
