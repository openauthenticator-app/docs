<script setup lang="ts">
defineProps<{
  pulse?: boolean
}>()
</script>

<template>
  <div
    class="pill border"
    :class="{ pulse: pulse }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/animations';
@import 'assets/colors';

.pill {
  &.pulse::before {
    $radius: 6px;

    content: '';
    width: $radius;
    height: $radius;
    background-color: $primary;
    border-radius: 50%;

    @include pulse;
  }

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background-color: #{$green-glow};
  margin-bottom: 1rem;
  font-family: var(--bs-font-monospace), monospace;
  color: $primary;
  font-size: 0.7rem;
}
</style>
