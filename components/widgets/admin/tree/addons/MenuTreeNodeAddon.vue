<template>
  <ul>
    <MenuTreeNode v-for="node in props.settings.arrayNode" :key="node.id" :node="node" />
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { MenuInterface } from '../interface/MenuInterface';
import MenuTreeNode from './MenuTreeNode.vue';

const props = defineProps({
  settings: {
    type: Object as PropType<MenuInterface['settings']>,
    required: true
  }
})

onMounted(() => {
  //console.log(props.settings.arrayNode);
})
</script>

<style scoped>

</style>