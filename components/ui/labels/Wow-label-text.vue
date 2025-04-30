<template>
  <div class="label-body fc fc-col">
    <div>{{ props.label }}</div>
    <div class="area-naming-st" :class="color">
      <div class="fc fc-row fc-align-content-center">
        {{ props.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'coral'
  }
});
</script>

<style lang="less" scoped>
.label-body {
  padding: 10px 0;

  .area-naming-st {
    padding: 10px;

    &.coral {
      border-left: 4px solid #F56C6C;
    }

    &.blue {
      border-left: 4px solid #337ecc;
    }
  }
}
</style>