<template>
  <li class="point-none" v-if="node">

    <el-tooltip :content="content" placement="bottom" effect="light" :disabled="contentVisible">
      <div class="text-menu fc fc-row fc-align-center fc-justify-space-b" @click="toggleActive()">
        <div class="fc fc-row">
          <div class='icon ' v-if="node?.icon">
            <wow-icon type="mdi" :path="node.icon" :size="20" />
          </div>

          <div class='user-select-none'>
            {{ node.name }}
          </div>
        </div>

        <div class='icon' v-if="node.children?.length">
          <wow-icon type="mdi" :path="chevronTurn" :size="20" />
        </div>
      </div>
    </el-tooltip>

    <transition name="fade">
      <ul class="point-none submenu" v-if="node.children?.length && props.node.active">
        <MenuTreeNode v-for="child in node.children" :key="child.id" :node="child" />
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import {  onMounted, computed } from 'vue';
import type { PropType } from 'vue';
import type { MenuNodeInterface } from '../interface/MenuNodeInterface';
import { mdiChevronRight, mdiChevronDown } from '@mdi/js';

const props = defineProps({
  node: {
    type: Object as PropType<MenuNodeInterface>,
    required: true
  },
  functions: {
    type: Object
  }
});

onMounted(() => {
})

const content = computed(() => props.node.tooltip ?? '');
const contentVisible = computed(() => !props.node.tooltip);

const chevronTurn = computed(() => {
  return props.node.active ? mdiChevronDown : mdiChevronRight;
})

const toggleActive = () => {
  props.node.active = !props.node.active;
}

</script>

<style scoped>
.text-menu {
  height: 35px;
  cursor: pointer;
  transition: color 0.2s, padding-left 0.2s;
}

.text-menu:hover {
  color: #b4e9e9;
  padding-left: 3px;
}

.point-none {
  list-style-type: none;
}

.submenu {
  padding-left: 35px;
}

.icon {
  padding-right: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>