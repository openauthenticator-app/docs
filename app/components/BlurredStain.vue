<script setup lang="ts">
withDefaults(defineProps<{
  center?: boolean
  size?: number | string
}>(), {
  center: true,
  size: 200,
})
</script>

<template>
  <div
    class="blurred-stain"
    :class="{ center: center }"
    :style="`--size: ${size}px;`"
  />
</template>

<style lang="scss" scoped>
@use 'sass:math';

// noinspection Stylelint
@import 'assets/colors';

.blurred-stain {
  height: var(--size);
  width: var(--size);
  background-color: #{rgb($green-glow, 0.15)};
  border-radius: 50%;
  filter: blur(calc(var(--size) / 2));

  &.center {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>
