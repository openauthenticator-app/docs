<script setup lang="ts">
withDefaults(defineProps<{
  level?: string | number
}>(), {
  level: 2,
})
</script>

<template>
  <div>
    <span
      v-if="$slots.before"
      class="before mb-3"
    >
      <slot name="before" />
    </span>
    <component :is="`h${level}`">
      <slot />
    </component>
    <div
      v-if="$slots.description"
      class="pt-3 text-muted"
    >
      <slot name="description" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/colors';

.before {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: $primary;
}
</style>
