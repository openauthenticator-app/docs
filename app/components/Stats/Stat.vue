<script setup lang="ts">
defineProps<{
  title: string
  stat: unknown
}>()
</script>

<template>
  <b-col
    class="stat mt-5 mb-5"
    sm="6"
    md="3"
  >
    <h2 class="text-primary">
      {{ stat }}
    </h2>
    <span class="text-muted">
      {{ title }}
    </span>
  </b-col>
</template>

<style lang="scss" scoped>
.stat {
  font-size: 0.8rem;

  h2 {
    font-weight: normal;
    font-size: 2.5rem;
  }
}
</style>
