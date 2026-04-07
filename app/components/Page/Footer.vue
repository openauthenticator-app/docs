<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
// const switchLocalePath = useSwitchLocalePath()
const year = (new Date()).getFullYear()
</script>

<template>
  <footer>
    <container class="text-muted">
      <div class="d-flex flex-column flex-sm-row justify-content-between">
        <ul class="icon-list flex-fill mb-3 mb-md-0">
          <li
            v-for="(availableLocale, index) in availableLocales"
            :key="`locale-${availableLocale}`"
          >
            <a
              href="#"
              :class="{ 'text-muted': locale !== availableLocale }"
              @click.prevent="locale = availableLocale"
            >
              {{ locale === availableLocale ? `[${availableLocale}]` : availableLocale }}
            </a>
            <span v-if="index < availableLocales.length - 1">
              ·
            </span>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <p class="mb-0">
            &copy; {{ year }} <a href="https://skyost.eu">Skyost</a> · Yet another developer
          </p>
        </div>
      </div>
    </container>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  font-size: 0.8em;
  font-family: var(--bs-font-monospace), monospace;

  ul {
    margin-bottom: 0;

    &.icon-list {
      padding-left: 0;

      li {
        display: inline-block;
        margin-left: 0.2em;
        margin-right: 0.2em;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        img {
          opacity: 0.8;
          transition: opacity 0.2s;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
