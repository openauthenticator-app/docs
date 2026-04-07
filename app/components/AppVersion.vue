<script setup lang="ts">
const { data } = useFetch<{ version: string }>(`/_app/version.json`)
</script>

<template>
  <span v-if="data && data.version">
    <slot name="prefix" /> v{{ data.version }}<slot name="suffix" />
  </span>
</template>
