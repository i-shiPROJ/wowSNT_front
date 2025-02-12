<template>
  <div class="wow-icon-badge">
    <slot name="icon"/>
    <div class="badge" :class="classes">
      <slot name="value"/>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  position: {
    type: String,
    default: 'badge-right-down'
  },

  backgroundColor: {
    type: String,
    default: 'badge-color'
  },
})

const classes = computed(() => {
  return {
    'badge-right-down': props.position === 'badge-right-down',
    'badge-color': props.backgroundColor === 'badge-color'
  }
})

</script>

<style type="less" scoped>
.wow-icon-badge {
  position: relative;
  display: inline-block;

  .badge {
    position: absolute;
    transform: translate(-50%, -50%);
    height: 30px;
    width: 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .badge-color {
    background-color: #F56C6C;
  }

  .badge-right-down {
    top: 70%;
    left: 80%;
  }
        
}
</style>