<template>
  <div class="">

    <div v-for="bell in bellArray" :key="bell.id" class="bell-row fc fc-row fc-justify-space-b">
      <div class="bell-ico fc fc-align-center fc-justify-center">
        <div class="icon fc fc-align-center bg-light-gray-0 tc-dark-gray-4">
          <wow-icon type="mdi" :path="bell.icon" />
        </div>
      </div>
      <div class="bell-body tc-dark-gray-4 fc fc-align-center fc-justify-start f-w-900">
        {{ bell.content }}
      </div>
      <div class="bell-number fc fc-align-center fc-justify-center">
        <div class="number bg-light-gray-0 tc-muted_blue f-w-900">
          <b>{{ bell.size }}</b>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import type { BellInterface } from './BellInterface';

const props = defineProps({
  bellArray: Array as PropType<BellInterface[]>
  /* type: Array as PropType<MenuInterface[]>, */
})
</script>

<style scoped>
.bell-row {
  height: 50px;
  cursor: pointer;

  .bell-ico {
    width: 50px;

    .icon {
      padding: 7px 7px;
      border-radius: 5px;
    }
  }

  .bell-body {
    width: 230px;
    padding: 5px 5px;
  }

  .bell-number {
    width: 60px;

    .number {
      padding: 0 5px;
      border-radius: 5px;
      font-size: 0.7rem;
    }
  }
}
</style>