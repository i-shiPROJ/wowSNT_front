<template>
  <div class="menuBtn fc fc-row fc-align-center tc-light-gray-0" :class="{ menuBtnActive: settings.active }" v-if="settings?.name" @click="toggleActive()">
    <div class='icon' v-if="settings?.icon">
      <wow-icon type="mdi" :path="settings.icon" :size="20" />
    </div>
    <div>
      {{ settings.name }}
    </div>
  </div>
</template>

<script setup lang="ts">


const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  //console.log(props);
})

const toggleActive = () => {
  console.log(props.settings.active);
  props.settings.active = !props.settings.active;
}
</script>

<style scoped>
.menuBtn {
  height: 45px;
  padding-left: 20px;
  color: #9DABC4;
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