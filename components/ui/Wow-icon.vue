<template>
  <svg-icon :type="type" :path="path"></svg-icon>
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
})

</script>

<style lang="less" scoped></style>