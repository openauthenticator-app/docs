<script setup lang="ts">
const route = useRoute()

const items = computed(() => [
  {
    title: 'navbar.index',
    to: '/',
    icon: {
      normal: 'heroicons:home',
      active: 'heroicons:home-solid',
    },
    active: route.path === '/',
  },
  {
    title: 'navbar.faq',
    to: '/faq/',
    icon: {
      normal: 'heroicons:question-mark-circle',
      active: 'heroicons:question-mark-circle-solid',
    },
    active: route.path.startsWith('/faq'),
  },
  {
    title: 'navbar.privacyPolicy',
    to: '/privacy-policy/',
    icon: {
      normal: 'heroicons:eye',
      active: 'heroicons:eye-solid',
    },
    active: route.path.startsWith('/privacy-policy'),
  },
  {
    title: 'navbar.termsOfService',
    to: '/terms-of-service/',
    icon: {
      normal: 'heroicons:document-text',
      active: 'heroicons:document-text-solid',
    },
    active: route.path.startsWith('/terms-of-service'),
  },
  {
    title: 'navbar.contact',
    to: '/contact/',
    icon: {
      normal: 'heroicons:at-symbol',
      active: 'heroicons:at-symbol-solid',
    },
    active: route.path.startsWith('/contact'),
  },
])
</script>

<template>
  <b-navbar
    class="navbar"
    v-b-color-mode="'dark'"
    toggleable="lg"
    :variant="null"
    sticky="top"
  >
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse
      id="nav-collapse"
      class="position-relative"
      is-nav
    >
      <b-navbar-nav class="ms-auto me-auto">
        <b-nav-item
          v-for="(item, index) in items"
          :key="`navbar-item-${index}`"
          :to="item.to"
          :class="{ 'fw-bold': item.active }"
        >
          {{ $t(item.title) }}
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="download">
        <b-button
          to="/#download"
          variant="primary"
          size="sm"
        >
          <icon name="heroicons:arrow-down-tray" /> <span class="d-inline d-lg-none d-xl-inline">{{ $t('navbar.downloadButton') }}</span>
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss" scoped>
@import 'assets/bootstrap-mixins';

.navbar {
  background-color: rgb(10, 15, 13, 70%);
  backdrop-filter: blur(20px);

  .download {
    position: absolute;
    right: 0;

    @include media-breakpoint-down(lg) {
      position: relative;
    }
  }

  @include media-breakpoint-down(lg) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
