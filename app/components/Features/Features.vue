<template>
  <b-container
    fluid
    class="features border rounded overflow-hidden"
  >
    <b-row>
      <slot />
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
.features {
  border-width: 0.5px;
}
</style>
