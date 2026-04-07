<script setup lang="ts">
defineProps<{
  emoji?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <b-col
    class="feature p-5"
    sm="12"
    lg="4"
  >
    <span class="icon p-2 mb-3">
      {{ emoji }}
    </span>
    <h3
      v-if="title"
      class="mb-3"
    >
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="text-muted mb-0"
      v-html="description"
    />
  </b-col>
</template>

<style lang="scss" scoped>
@import 'assets/bootstrap-mixins';
@import 'assets/colors';

.feature {
  border: 0.5px solid var(--bs-border-color);
  transition: background-color 0.2s;

  .icon {
    $size: 44px;

    height: $size;
    width: $size;
    text-align: center;
    display: inline-block;
    background-color: $green-glow;

    @include rounded;
    @include border;
  }

  h3 {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: $green-glow;
  }
}
</style>
