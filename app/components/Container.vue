<script setup lang="ts">
withDefaults(defineProps<{
  alternate?: boolean
  offsetLg?: number
  verticalPadding?: number | string
}>(), {
  verticalPadding: 5,
  offsetLg: 1
})
</script>

<template>
  <div :class="{'bg-body-tertiary': alternate, 'border-top': alternate, 'border-bottom': alternate}">
    <b-container
      fluid
      :class="`py-${verticalPadding}`"
    >
      <b-row>
        <b-col
          :offset-lg="offsetLg"
          sm="12"
          :lg="12 - 2 * offsetLg"
        >
          <slot />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
