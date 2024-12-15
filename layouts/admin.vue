<template>
  <div class="common-layout">

    <!--     <div class="aside bg-dark-brown-0" >
      <admin-menu></admin-menu>
    </div> -->
    <el-col class="leftPanel" :xs="0" :sm="4">
      <div class="aside bg-blue_0 " v-if="!isMobile">
        <div class="logo fc fc-align-center fc-justify-center tc-light-gray-0">wowSNT</div>
        <wow-tree-menu></wow-tree-menu>
        <!-- <admin-menu /> -->
      </div>
    </el-col>

    <el-col :xs="24" :sm="20" class="bg-light-gray-0">
      <div class="wow-container tc-gray-0">

        <div v-if="isMobile">
          <wow-panel v-if="settingsWowPanel.show" title="Навигация" position="left" :settings="settingsWowPanel">
            <template #body>
              <admin-menu></admin-menu>
            </template>
          </wow-panel>
        </div>

        <header class="header">

          <div v-if="isMobile">
            <div class="btn-menu" @click="toggleMenu()">
              <wow-icon type="mdi" :path="$mdi.mdiMenu" :size="40" />
            </div>
          </div>

          <div v-else></div>

          <div class="header-right">
            <div class="iconBlock">
              <div class="greenIndicator">
                <div class="blinking-circle"></div>
              </div>
              <wow-icon type="mdi" :path="$mdi.mdiBellOutline" />
            </div>
            <div class="iconBlock">
              <div class="greenIndicator">
                <div class="blinking-circle"></div>
              </div>
              <wow-icon type="mdi" :path="$mdi.mdiChatOutline" />
            </div>
            <div class="userSymbols bg-red-1 f-w-900">ГВ</div>
          </div>
        </header>

        <div class="wrapper">
          <main class="main">
            <div class="fc fc-row fc-wrap fc-justify-space-b">
              <wow-card v-for="(item, index) in items" :key="index" :xs="1" :sm="2" :md="3" :lg="4" :xl="5">
                <template #header>Header {{ item }}</template>
                <template #body>Body {{ item }}</template>
              </wow-card>
            </div>

          </main>

          <footer class="footer fc fc-row fc-justify-space-a fc-align-center">
            <div>{{ new Date().getFullYear() }}©</div>
            <div>i-shiPROJ</div>
            <div>about support</div>
            <!--           <el-row class=""  style="width: 100%;" justify="center" :align="'middle'">
            <el-col class=" tc-dark-gray-4 f-w-900" :xs="22" :sm="7" :md="6" :lg="5" :xl="4">

            </el-col>
          </el-row> -->
          </footer>
        </div>
      </div>
    </el-col>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const drawerVisible = ref(false);
const items = 100;

const toggleMenu = () => {
  settingsWowPanel.show = !settingsWowPanel.show; // Переключение состояния видимости
};

let settingsWowPanel = reactive({
  model: {},
  show: false,
  functions: {
    close: toggleMenu
  }
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};



const handleClickOutside = (event: MouseEvent) => {
  const drawer = document.querySelector('.drawer');
  if (drawer && !drawer.contains(event.target as Node)) {
    drawerVisible.value = false; // Закрыть меню, если кликнули вне
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  document.addEventListener('click', handleClickOutside); // Добавляем обработчик клика
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  document.removeEventListener('click', handleClickOutside); // Убираем обработчик клика
});
</script>

<style scoped>
/* for deleted after test wowbloc */
/*  */

.common-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .leftPanel {
    box-shadow: 1px 0 20px 0 #3f4d67;
    z-index: 2;
  }

  .aside {
    height: 100%;

    .logo {
      height: 70px;
    }
  }

  .wow-container {
    overflow-y: auto;
    height: 100vh;
    max-height: 100vh;
    padding: 0 1.5rem;

    @media (max-width: 768px) {
      padding-right: 15px;
      padding-bottom: 15px;
      padding-left: 16px;
    }

    .header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      height: 60px;
      background-color: rgba(249, 249, 249, 0.6);
      /* Полупрозрачный фон */
      backdrop-filter: blur(3px);

      .btn-menu {
        height: 50px;
        width: 50px;
        padding-top: 10px;
        padding-left: 15px;

      }

      .header-right {
        display: flex;
        align-items: end;

        .iconBlock {
          width: 50px;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          .greenIndicator {
            padding: 5px 0;

            .blinking-circle {
              width: 5px;
              height: 5px;
              background-color: #8ec07c;
              border-radius: 50%;
              animation: blink 1s infinite;
            }


          }
        }

        .userSymbols {
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          cursor: default;
        }
      }
    }

    .wrapper {
      min-height: calc(100% - 73px);
      display: flex;
      flex-direction: column;
      /*       overflow-y: auto; 
      max-height: calc(100vh - 73px) */
      ;
    }

    .main {
      flex: 1;
    }

    .footer {
      height: 60px;
      width: 100%;
    }


  }
}

.drawer-content {
  padding: 20px;
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