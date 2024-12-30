<template>
  <div class="iconBlock">

    <div class="greenIndicator fc fc-align-center">
      <div v-if="getBlinkingCircle" class="blinking-circle"></div>
    </div>
    <el-button type="" link size="large" v-popover="popoverRef" v-click-outside="onClickOutside">
      <wow-icon type="mdi" :path="$mdi.mdiBellOutline" />
    </el-button>


    <el-popover ref="popoverRef" trigger="click" title="Уведомления" :width="350" virtual-triggering persistent>
      <BellBody :bellArray="bellArray" />
    </el-popover>

  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { computed } from 'vue';
import { mdiChatOutline, mdiCurrencyRub, mdiFileArrowLeftRightOutline } from '@mdi/js';
import { v6 as uuidv6 } from 'uuid';

const getBlinkingCircle = computed(() => true);
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const bellArray = reactive(
  [
    {
      id: uuidv6(),
      icon: mdiChatOutline,
      content: ' Электронные обращения',
      size: '3 шт'
    },
    {
      id: uuidv6(),
      icon: mdiCurrencyRub,
      content: 'Новые платежи',
      size: '2000 шт'
    },
    {
      id: uuidv6(),
      icon: mdiFileArrowLeftRightOutline,
      content: 'Замечено кадастровых изменений',
      size: '5 шт'
    },
  ]
) 
</script>

<style scoped>
.iconBlock {
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .greenIndicator {
    height: 15px;
    /*  padding: 5px 0; */

    .blinking-circle {
      width: 5px;
      height: 5px;
      background-color: #8ec07c;
      border-radius: 50%;
      animation: blink 1s infinite;
    }

  }
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
    /* Полная прозрачность */
  }
}
</style>