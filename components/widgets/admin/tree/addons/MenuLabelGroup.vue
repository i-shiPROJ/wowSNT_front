<template>
  <div class="labelGropup fc fc-row fc-align-center tc-light-gray-0 point-none" v-if="settings?.name">
    <div class='icon' v-if="settings?.icon">
      <wow-icon type="mdi" :path="settings.icon" :size="20" />
    </div>
    <div class="text user-select-none">
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
})
</script>

<style scoped>
.labelGropup {
  text-transform: uppercase;
  margin: 10px 0;
  padding-left: 20px;
}

.icon {
  padding-right: 15px;
}

.text {
  font-size: 0.7rem;
}
</style>