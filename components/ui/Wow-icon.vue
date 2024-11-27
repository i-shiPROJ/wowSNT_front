<template>
  <svg-icon :type="type" :path="path" :width="size" :height="size"></svg-icon>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 24
  }
})

</script>

<style lang="less" scoped></style>