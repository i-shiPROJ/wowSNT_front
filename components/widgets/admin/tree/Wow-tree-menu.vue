<template>
  <div class="menu-tree-widget">
    <component v-for="nodeComponents in objectMenu" :key="nodeComponents.id" :is="getComponets(nodeComponents.type)"
      :settings="nodeComponents.settings" />
  </div>

  <!-- <Tree-node v-for="node in objectTree" :key="node.id" :node="node" /> -->

</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { PropType } from 'vue';
import type { MenuInterface } from './interface/MenuInterface';

import LabelGroup from './addons/MenuLabelGroup.vue';
import MenuBtn from './addons/MenuBtn.vue';
import TreeNodeMenu from './addons/MenuTreeNodeAddon.vue';

const props = defineProps({
  objectMenu: {
    type: Array as PropType<MenuInterface[]>,
  }
})

onMounted(() => {

})

const getComponets = (type: string) => {
  switch (type) {
    case 'labelGroup':
      return LabelGroup;
    case 'menuBtn':
      return MenuBtn;
    case 'treeNodeMenu':
      return TreeNodeMenu;
    default:
      return null;
  }
}

</script>

<style scoped>
/* .menu-tree-widget {
  margin: 5px 5px;
} */
</style>