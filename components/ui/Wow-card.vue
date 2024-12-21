<template>
  <div class="wow-card" :style="computedStyle">
    <div class="inside-block">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="body">
        <slot name="body" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onBeforeUnmount, ref, computed } from 'vue';

/* 
xs <768px; sm	≥768px; md	≥992px; lg	≥1200px; xl	≥1920px
*/

const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') { // Проверка на наличие window
    screenWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const props = defineProps({
  width: { type: String },
  //flex: 1 0 calc(100% / 3);
  xs: { type: Number, default: 1  },
  sm: { type: Number, required: true },
  md: { type: Number },
  lg: { type: Number },
  xl: { type: Number }
})

const getFlexcolumn = () => {
  const breakpoints = [
    { max: 760, value: props.xs },
    { min: 768, max: 992, value: props.sm },
    { min: 992, max: 1200, value: props.md },
    { min: 1200, max: 1920, value: props.lg },
    { min: 1920, value: props.xl },
  ];

  const breakpoint = breakpoints.find(item => 
    (item.min === undefined || screenWidth.value >= item.min) &&
    (item.max === undefined || screenWidth.value < item.max)
  );

  return breakpoint ? breakpoint.value : props.xs; // Возвращаем значение по умолчанию, если ничего не найдено
};

const computedStyle = computed(() => {
  const flexColumn = getFlexcolumn();
  const arrayStyle = [
    `width:${props.width};`,
    `flex: 1 0 calc(100% / ${flexColumn} - 2.50rem);`,
  ];

  return arrayStyle.join(''); // Возвращает значение свойства title
});

</script>

<style lang="less" scoped>
.wow-card {
  margin: 0.8rem;

  .inside-block {
    box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
    border: 1px solid #F1F1F4;
    padding: 1.25rem;
    background-color: #FFF;
    border-radius: 10px;

    .header {}

    .body {
      padding: 1rem 0;
    }
  }




}
</style>