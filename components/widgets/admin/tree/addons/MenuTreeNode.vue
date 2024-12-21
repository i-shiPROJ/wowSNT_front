<template>
  <li v-if="node">
    <strong>{{ node.name }}</strong>
    <ul v-if="node.children?.length">
      <MenuTreeNode v-for="child in node.children" :key="child.id" :node="child" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed } from 'vue';
import type { PropType } from 'vue';
import type { MenuNodeInterface } from '../interface/MenuNodeInterface';

const props = defineProps({
  node: {
    type: Object as PropType<MenuNodeInterface>,
    required: true
  }
});

onMounted(() => {
  //console.log(props.node);
})

</script>

<style scoped></style>