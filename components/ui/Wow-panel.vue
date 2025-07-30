<template>
  <div class="wow-panel" :class="getClassPanel"  @click="close()">
    <div class="panel bg-blue_0 tc-dark-gray-8 " @click.stop>
      <div class="header">
        <div class="f-w-900"> {{ computedTitle }} </div>
        <div>
          <el-button color="#3F4D66" @click="close()">
            <el-icon style="vertical-align: middle">
              <wow-icon type="mdi" :path="$mdi.mdiClose"></wow-icon>
            </el-icon>
            <!-- <span style="vertical-align: middle"> Close </span> -->
          </el-button>
        </div>
      </div>
      <div class="body">
        <slot name="body" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits();

const props = defineProps({
  title: { type: String, required: true },
  position: { type: String, default: 'left' },
  settings: { type: Object }
});
const timeAnimation = 150;

const computedTitle = computed(() => {
  return props.title; // Возвращает значение свойства title
});

const getClassPanel = computed(() => {
  let allClasses = props.position === 'left' ? 'wow-flex-jc-start' : 'wow-flex-jc-end';
  return allClasses;
})

onMounted(() => {
  const panel = document.querySelector('.panel') as HTMLElement;
  panel.style.transform = props.position === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
  panel.style.display = 'block';
  open();

});

const open = () => {
  // сдвиг панели при открытии
  const panel = document.querySelector('.panel') as HTMLElement;
  if (panel) {
    setTimeout(() => {
      panel.style.transition = `transform ${timeAnimation}ms ease`;
      panel.style.transform = props.position === 'left' ? 'translateX(0%)' : 'translateX(0%)';
    }, 1);
  }
}

const close = () => {
  // Сдвиг панели при закрытии
  emit('close');
  const panel = document.querySelector('.panel') as HTMLElement;
  if (panel) {
    panel.style.transition = `transform ${timeAnimation}ms ease`;
    panel.style.transform = props.position === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    setTimeout(() => {
      props.settings?.functions?.close();
    }, timeAnimation);
  }
}

</script>

<style scoped>
.wow-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #28282886;
  /* Полупрозрачный фон */
  backdrop-filter: blur(2px);
  /* Размытие фона */
  z-index: 999;
  overflow: hidden;


  .panel {
    /* background-color: #282828; */
    box-shadow: 0px 0px 17px 2px black;
    width: 300px;
    height: 100%;
    /* для скрытия из виду */
    transform: translateX(-100%);
    display: none;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      margin: 10px;
    }

    .body {
      height: calc(100% - 50px);
      overflow-y: auto;
      /* padding: 10px; */
    }
  }

}

.wow-flex-jc-start {
  display: flex;
  justify-content: flex-start;
}

.wow-flex-jc-end {
  display: flex;
  justify-content: flex-end;
}
</style>