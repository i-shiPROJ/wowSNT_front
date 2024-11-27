<template>
  <div class="wow-panel" :class="getClassPanel">
    <div class="panel tc-brown-0">
      <div class="header">
        <div> {{ computedTitle }} </div>
        <div>
          <el-button color="#a89984" @click="close()">
            <el-icon style="vertical-align: middle">
              <wow-icon type="mdi" :path="$mdi.mdiClose"></wow-icon>
            </el-icon>
            <!-- <span style="vertical-align: middle"> Close </span> -->
          </el-button>
        </div>
      </div>
      <div></div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits();

const props = defineProps({
  title: { type: String, required: true },
  position: { type: String, default: 'left' }
});

const computedTitle = computed(() => {
  return props.title; // Возвращает значение свойства title
});

const getClassPanel = computed(() => {
  let allClasses = props.position === 'left' ? 'wow-flex-jc-start' : 'wow-flex-jc-end';
  return allClasses;
})

onMounted(() => { // Замените componentDidMount на onMounted
  const panel = document.querySelector('.panel') as HTMLElement;
  panel.style.transform = props.position === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
  panel.style.display= 'block';
  open();

});

const open = () => {
  // Логика для сдвига панели
  const panel = document.querySelector('.panel') as HTMLElement; // Приведение типа к HTMLElement
  
  if (panel) {
    setTimeout(() => {
      panel.style.transition = 'transform 0.3s ease';
      panel.style.transform = props.position === 'left' ? 'translateX(0%)' : 'translateX(0%)';
    }, 1);

  }
}

const close = () => {
  // Логика для закрытия компонента
  // Например, можно использовать событие для родительского компонента
  emit('close');

  // Логика для сдвига панели
  const panel = document.querySelector('.panel') as HTMLElement; // Приведение типа к HTMLElement
  if (panel) {
    panel.style.transition = 'transform 0.3s ease';
    panel.style.transform = props.position === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
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
    background-color: #282828;
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