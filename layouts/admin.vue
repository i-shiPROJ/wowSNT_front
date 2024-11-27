<template>
  <div class="common-layout">

    <!--     <div class="aside bg-dark-brown-0" >
      <admin-menu></admin-menu>
    </div> -->
    <el-col :xs="0" :sm="4">
      <div class="aside bg-blue_0 " v-if="!isMobile">
        <div class="logo"></div>
        <admin-menu />
      </div>
    </el-col>

    <el-col :xs="24" :sm="20" class="bg-light-gray-0">
      <div class="wow-container tc-gray-0">

        <header class="header">
          <div v-if="isMobile">
            <div class="btn-menu" @click="toggleMenu()">
              <wow-icon type="mdi" :path="$mdi.mdiMenu" :size="40" />
            </div>
            <!--             <el-link :underline="false">
              
            </el-link> -->
            <!-- <el-button @click="toggleMenu()">Toggle Menu</el-button> -->
            <wow-panel v-if="settingsWowPanel.show" title="Навигация" position="left" :settings="settingsWowPanel">
              <template #body>
                <admin-menu></admin-menu>
              </template>
            </wow-panel>
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

        <main>body</main>

        <footer>footer</footer>
        <!--       <el-header>Header </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer> -->
      </div>
    </el-col>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const drawerVisible = ref(false);

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
.common-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .aside {
    height: 100%;

    .logo {
      height: 70px;
    }
  }

  .wow-container {
    /* margin: 15px; */

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /*       border-radius: 10px; */
      padding: 5px;
      height: 60px;
      background-color: #fff;
      box-shadow: 0px 10px 30px 0px rgba(82, 63, 105, 0.05);

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

    .main {}

    .footer {}
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