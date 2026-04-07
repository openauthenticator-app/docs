<script setup lang="ts">
import { siteMeta } from '~/site'
import { generateJson, type TranslationFile } from '~/components/Translation/Table.vue'

const markdownT = useMarkdownT()

const showModal = defineModel<boolean>()

const props = defineProps<{
  file?: TranslationFile
}>()

const modalFileLink = computed<string>(() => {
  if (props.file?.fileExists) {
    return `${siteMeta.github}/edit/main/lib/i18n/${props.file?.targetLanguage}/${props.file?.fileName}`
  }
  return `${siteMeta.github}/new/main/lib/i18n/?filename=${props.file?.targetLanguage}/${props.file?.fileName}`
})
const modalCode = computed<string>(() => props.file ? generateJson(props.file.data) : '')
</script>

<template>
  <b-modal
    v-model="showModal"
    class="translation-modal"
    size="xl"
    :title="$t('translate.modal.modalTitle')"
    :ok-title="$t('translate.modal.close')"
    ok-variant="secondary"
    ok-only
  >
    <title-with-subtitle>
      <span v-html="markdownT('translate.modal.title')" />
      <template #description>
        <p>
          {{ $t('translate.modal.subtitle') }}
        </p>
      </template>
    </title-with-subtitle>
    <h2>{{ $t('translate.modal.grabCode.title') }}</h2>
    <p class="text-muted">
      {{ $t('translate.modal.grabCode.copyCode') }}
    </p>
    <json-highlight
      class="mb-3"
      :content="modalCode"
      :copy-text="$t('translate.modal.grabCode.copyToClipboard')"
    />
    <p class="text-muted">
      {{ $t('translate.modal.grabCode.translationData') }}
    </p>
    <h2>{{ $t('translate.modal.openGithub.title') }}</h2>
    <p class="text-muted">
      {{ $t('translate.modal.openGithub.click') }}
    </p>
    <b-alert
      :model-value="true"
      variant="light"
      body-class="d-flex align-items-center"
    >
      <icon
        name="bi:github"
        class="me-2"
      />
      <a
        class="alert-link fw-normal font-monospace text-decoration-none"
        :href="modalFileLink"
        v-text="modalFileLink"
      />
    </b-alert>
    <b-alert
      :model-value="true"
      variant="primary"
      body-class="d-flex align-items-center"
    >
      <icon
        name="bi:exclamation-circle-fill"
        class="me-2"
      />
      <p
        class="mb-0"
        v-html="markdownT('translate.modal.openGithub.note')"
      />
    </b-alert>
    <h2>{{ $t('translate.modal.fork.title') }}</h2>
    <p class="text-muted">
      <span v-html="markdownT('translate.modal.fork.fork')" /> <span v-html="markdownT('translate.modal.fork.pasteTheCode')" /> <span v-html="markdownT('translate.modal.fork.commit')" />
    </p>
    <h2>{{ $t('translate.modal.pullRequest.title') }}</h2>
    <p
      class="text-muted"
      v-html="markdownT('translate.modal.pullRequest.beforeCreate')"
    />
    <b-alert
      :model-value="true"
      variant="primary"
    >
      <ul class="mb-0">
        <li>
          <strong>Title :</strong> <span v-html="markdownT('translate.modal.pullRequest.form.title', { file: file?.fileName, language: file?.targetLanguage })" />
        </li>
        <li>
          <strong>Message :</strong> <span v-html="markdownT('translate.modal.pullRequest.form.message')" />
        </li>
      </ul>
    </b-alert>
    <p
      class="text-muted"
      v-html="markdownT('translate.modal.pullRequest.create')"
    />
    <h2>{{ $t('translate.modal.done.title') }}</h2>
    <p class="text-muted mb-0">
      {{ $t('translate.modal.done.message') }}
    </p>
  </b-modal>
</template>

<style scoped lang="scss">
.translation-modal {
  counter-reset: step-counter;

  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    counter-increment: step-counter;

    &::before {
      display: inline-block;
      font-family: var(--bs-font-monospace), monospace;
      margin-right: 0.3em;
      color: var(--bs-primary);
      font-weight: normal;
      content: '#'counter(step-counter)' ';
    }
  }
}

:deep(.text-button) {
  font-size: 0.75em;
  padding: 0.25rem;
  vertical-align: 0;
}
</style>
