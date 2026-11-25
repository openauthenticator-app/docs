<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const openGraphLocales: Record<string, string> = {
  de: 'de_DE',
  en: 'en_GB',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  pt: 'pt_PT',
}
useSeoMeta({ ogLocale: () => openGraphLocales[locale.value] })
</script>

<template>
  <Html
    :lang="locale"
    dir="ltr"
    data-bs-theme="dark"
  >
    <page-navbar />
    <slot />
    <page-footer />
  </Html>
</template>

<style lang="scss">
@import 'assets/animations';
@import 'assets/bootstrap-mixins';

.fade-up-1 {
  @include fade-up;
}

.fade-up-2 {
  @include fade-up(0.1s);
}

.fade-up-3 {
  @include fade-up(0.2s);
}

.fade-up-4 {
  @include fade-up(0.3s);
}

.fade-up-5 {
  @include fade-up(0.4s);
}

.fade-up-6 {
  @include fade-up(0.4s, 0.7s);
}

.accordion {
  .number {
    display: inline-block;
    font-family: var(--bs-font-monospace), monospace;
    margin-right: 0.3em;
    color: var(--bs-primary);
    transition: color 0.2s, opacity 0.2s;
  }

  .accordion-item {
    margin-bottom: 2rem;

    @include border;
    @include rounded;
  }

  .accordion-header {
    @include rounded;
  }

  .accordion-button {
    background-color: var(--bs-tertiary-bg);

    @include rounded;

    &.collapsed {
      .number {
        color: var(--bs-accordion-color);
        opacity: 0.5;
      }
    }
  }

  .accordion-body {
    color: var(--bs-secondary-color);
    background-color: rgb(var(--bs-tertiary-bg-rgb), 0.4) !important;
  }
}

ul {
  list-style-type: '– ';
  padding-left: 1em;
}

label {
  font-family: var(--bs-font-monospace), monospace;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.btn .iconify {
  vertical-align: -0.15em;
}
</style>
