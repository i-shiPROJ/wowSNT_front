<template>
  <el-tooltip :content="content" placement="bottom-end" effect="light" :disabled="contentVisible">
    <div class="menuBtn fc fc-row fc-align-center tc-light-gray-0 point-none"
      :class="{ menuBtnActive: settings.active }" v-if="settings?.name" @click="toggleActive()">
      <div class='icon' v-if="settings?.icon">
        <wow-icon type="mdi" :path="settings.icon" :size="20" />
      </div>
      <div class="user-select-none">
        {{ settings.name }}
      </div>
    </div>
  </el-tooltip>

</template>

<script setup lang="ts">


const props = defineProps({
  keyComponent: {
    type: String
  },
  settings: {
    type: Object,
    required: true
  }
})

onMounted(() => {
})

const content = computed(() => props.settings.tooltip ?? '');
const contentVisible = computed(() => !props.settings.tooltip);

const toggleActive = () => {
  props.settings.functions.setActiveMenuItem(props.keyComponent);
  //props.settings.active = !props.settings.active;
}
</script>

<style scoped>
.menuBtn {
  min-height: 45px;
  padding-left: 20px;
  padding-right: 10px;
  color: #9DABC4;
  transition: color 0.2s, padding-left 0.2s, background-color 0.3s;
}

.menuBtn:hover {
  background-color: #3C4960;
  cursor: pointer;
}

.menuBtnActive {
  height: 45px;
  padding-left: 15px;
  border-left: 5px solid #5fafaf;
  background-color: #364257;
  color: #E8E9E9;
}

.icon {
  padding-right: 15px;
}
</style>