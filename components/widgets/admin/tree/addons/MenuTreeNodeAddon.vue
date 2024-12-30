<template>
  <ul class="menu-tree" :class="classActive">
    <MenuTreeNode v-if="props.settings?.arrayNode" v-for="node in props.settings.arrayNode" :key="node.id"
      :node="node" />
  </ul>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
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

})

const classActive = computed(() => {
  const active = props.settings?.arrayNode?.length ? props.settings.arrayNode[0].active : false;
  return active ? 'menuTreeActive' : '';
})
</script>

<style scoped>
.menu-tree {
  padding-left: 20px;
  color: #9DABC4;
}

.menuTreeActive {
  padding-left: 15px;
  border-left: 5px solid #5fafaf;
  background-color: #364257;
  color: #E8E9E9;
  transition: color 0.2s, padding-left 0.2s;
}
</style>