<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { load } from 'recaptcha-v3'
import { contactPostUrl, recaptchaKey } from '~/site'

enum FormState {
  incomplete,
  complete,
  sending,
  error,
  success,
}

const { t, locale } = useI18n()
const markdownT = useMarkdownT()
watch(
  locale,
  () => usePageHead({ title: t('contact.pageTitle') }),
  { immediate: true },
)

const maxMessageLength = 500
const moreInfoNeeded = 'moreInfoNeeded'
const subjects = [moreInfoNeeded, 'commercial', 'other']

const currentName = ref<string>('')
const currentEmail = ref<string>('')
const currentSubject = ref<string>(moreInfoNeeded)
const currentMessage = ref<string>('')
const currentState = ref<FormState>(FormState.incomplete)

const formSubmitEnabled = computed(() => currentState.value === FormState.complete)
const formEnabled = computed(() => currentState.value === FormState.incomplete || formSubmitEnabled.value)

watch(currentName, () => currentState.value = isValid() ? FormState.complete : FormState.incomplete)
watch(currentEmail, () => currentState.value = isValid() ? FormState.complete : FormState.incomplete)
watch(currentSubject, () => currentState.value = isValid() ? FormState.complete : FormState.incomplete)
watch(currentMessage, () => currentState.value = isValid() ? FormState.complete : FormState.incomplete)

const isValid = () => {
  if (!currentName.value || currentName.value.length === 0) {
    return false
  }
  if (!currentEmail.value || currentEmail.value.length === 0 || !(/\S+@\S+\.\S+/.test(currentEmail.value))) {
    return false
  }
  if (subjects.indexOf(currentSubject.value) === -1) {
    return false
  }
  return currentMessage.value && currentMessage.value.length > 0 && currentMessage.value.length <= maxMessageLength
}

const onFormSubmit = async () => {
  currentState.value = FormState.sending
  try {
    const recaptcha = await load(recaptchaKey, { autoHideBadge: true })
    const token = await recaptcha.execute('contact')
    await fetch(
      contactPostUrl,
      {
        method: 'post',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: currentName.value,
          email: currentEmail.value,
          subject: currentSubject.value,
          message: currentMessage.value,
          gCaptchaResponse: token,
        }),
      },
    )
    currentState.value = FormState.success
  }
  catch (ex) {
    console.error(ex)
    currentState.value = FormState.error
  }
}
</script>

<template>
  <container class="pt-lg-5">
    <title-with-subtitle level="1">
      <template #before>
        <span class="fade-up-1">{{ t('contact.title.before') }}</span>
      </template>
      <span
        class="fade-up-2"
        v-html="markdownT('contact.title.content')"
      />
      <template #description>
        <p
          class="fade-up-3 mb-5"
          v-html="markdownT('contact.description')"
        />
      </template>
    </title-with-subtitle>
    <client-only>
      <b-form
        class="fade-up-4 form"
        :action="contactPostUrl"
        method="post"
        @submit.prevent="onFormSubmit"
      >
        <b-form-group
          class="form-group"
          :label="t('contact.form.subject.label')"
          label-for="subject"
        >
          <div class="d-flex flex-column flex-sm-row align-items-stretch gap-2">
            <b-button
              v-for="(subject, index) in subjects"
              :key="`contact-subject-${index}`"
              :variant="currentSubject === subject ? 'primary' : 'secondary'"
              :disabled="!formEnabled"
              @click="currentSubject = subject"
            >
              {{ t(`contact.form.subject.options.${subject}`) }}
            </b-button>
          </div>
        </b-form-group>
        <hr class="text-primary">
        <b-form-group
          class="form-group"
          :label="t('contact.form.name.label')"
          label-for="name"
        >
          <b-form-input
            id="name"
            v-model="currentName"
            type="text"
            :placeholder="t('contact.form.name.placeholder')"
            :disabled="!formEnabled"
            required
          />
        </b-form-group>
        <b-form-group
          class="form-group"
          :label="t('contact.form.email.label')"
          label-for="name"
        >
          <b-form-input
            id="email"
            v-model="currentEmail"
            type="email"
            :placeholder="t('contact.form.email.placeholder')"
            :disabled="!formEnabled"
            required
          />
        </b-form-group>
        <b-form-group
          class="form-group"
          :label="t('contact.form.message.label')"
          label-for="message"
        >
          <b-form-textarea
            id="message"
            v-model="currentMessage"
            rows="6"
            :placeholder="t('contact.form.message.placeholder')"
            :disabled="!formEnabled"
            :maxlength="maxMessageLength"
          />
          <div class="counter text-end">
            {{ currentMessage.length }} / {{ maxMessageLength }}
          </div>
        </b-form-group>
        <b-button
          class="mt-2"
          variant="primary"
          type="submit"
          :disabled="!formSubmitEnabled"
        >
          <icon name="bi:send" /> {{ t('contact.form.send') }}
        </b-button>
      </b-form>
      <template #fallback>
        <spinner />
      </template>
    </client-only>
    <b-alert
      :model-value="currentState === FormState.error"
      class="mt-5 mb-5"
      variant="danger"
    >
      {{ t('contact.form.error') }}
    </b-alert>
    <b-alert
      :model-value="currentState === FormState.success"
      class="mt-5 mb-5"
      variant="success"
    >
      {{ t('contact.form.success') }}
    </b-alert>
  </container>
</template>

<style lang="scss" scoped>
@import 'assets/bootstrap-mixins';

.form {
  background-color: var(--bs-tertiary-bg);
  padding: 1.5rem 2rem;

  @include border;
  @include rounded;
}

.form-group {
  margin-top: 1rem;
  margin-bottom: 1.25rem;
}
</style>
