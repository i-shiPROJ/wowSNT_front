<template>
  <div class="common-layout">

    <div class="leftPanel" v-if="!isMobile">
      <div class="aside bg-blue_0 ">
        <div class="logo fc fc-align-center fc-justify-center tc-light-gray-0">wowSNT</div>
        <wow-tree-menu :objectMenu="menuObject"></wow-tree-menu>
        <!-- <admin-menu /> -->
      </div>
    </div>

    <div class="body bg-light-gray-0">
      <div class="wow-container tc-gray-0">

        <div v-if="isMobile">
          <wow-panel v-if="settingsWowPanel.show" title="Навигация" position="left" :settings="settingsWowPanel">
            <template #body>
              <wow-tree-menu :objectMenu="menuObject"></wow-tree-menu>
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
            <!-- <wow-bell /> -->

            <!--             <div class="iconBlock">
              <div class="greenIndicator">
                <div class="blinking-circle"></div>
              </div>
              <wow-icon type="mdi" :path="$mdi.mdiChatOutline" />
            </div>
            -->
            <wow-userIcon />
          </div>
        </header>

        <div class="wrapper">
          <main class="main">
            <slot />
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
    </div>

  </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { v6 as uuidv6 } from 'uuid';
import { mdiChartBar, mdiMonitorDashboard, mdiHomeAccount , mdiMenu } from '@mdi/js';

//import { menuObject } from '~/pages/user/menuObject';
import { useUserStore } from '@/stores/userInfo'
import { useMobileStore } from '~/stores/mobileInfo';
import type { Personinfo } from '~/interface/Personinfo.interface';

const userInfoStore = useUserStore()
const mobileStore = useMobileStore();

onBeforeMount(async()=>{
  await getUserInfo();
})

const getUserInfo = async () => {
  try {
    const data = await $fetch<Personinfo>('/person/user-info', {
      baseURL: useRuntimeConfig().public.baseURL,
      method: 'GET'
    })
    
    userInfoStore.setUser(data);
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    ElMessage.error("Ошибка запроса");
    navigateTo('/auth/SignIn');
  }
}


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
  if (typeof window !== 'undefined') { // Проверка на наличие объекта window
    isMobile.value = window.innerWidth < 768;
    mobileStore.setIsMobile(isMobile.value);
  }
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


//reactiveObjectMenu
const setActiveMenuItem = (id: string) => {
  menuObject.forEach(item => {
    item.settings.active = (item.id === id);
    if (item.settings.active && item.settings.url) {
      navigateTo(item.settings.url);
      //router.replace(item.settings.url);
    }
  });
}


const menuObject = reactive([
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: true,
      name: 'Главная',
      icon: mdiMonitorDashboard,
      tooltip: '',
      url: '/user',
      functions: {
        setActiveMenuItem
      }
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: 'Профиль',
      icon: mdiHomeAccount,
      tooltip: '',
      url: '/user/edit-user',
      functions: {
        setActiveMenuItem
      }
    },
  },
  /* {
    type: 'labelGroup',
    id: uuidv6(),
    settings: {
      name: 'СТ Краснодаргорстрой',
      tooltip: 'Tooltip-1',
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: '4 первомайская улица дом 20',
      icon: mdiMonitorDashboard,
      tooltip: 'Tooltip-2',
      url: '/user/house/1232',
      functions: {
        setActiveMenuItem
      }
    },
  },
  {
    type: 'labelGroup',
    id: uuidv6(),
    settings: {
      name: 'СТ Невеликое озеро багета',
      tooltip: 'Tooltip-3'
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: 'Центральный проезд Хорошёвского Серебряного Бора дом 20 корпус 1',
      icon: mdiChartBar,
      tooltip: 'Tooltip-4',
      functions: {
        setActiveMenuItem
      }
    },
  }, */

]);

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
    z-index: 4;
    width: 300px;
    height: 100%;
  }

  .body {
    flex: 1;
    width: 100%
  }

  .aside {
    height: 100%;

    .logo {
      height: 70px;
    }
  }

  .wow-container {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    max-height: 100%;
    /* padding: 0 1.5rem; */

    @media (max-width: 768px) {
      /* padding-bottom: 15px; */
      /* padding-right: 15px;
      padding-left: 16px; */
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
      z-index: 3;
      border-bottom: 1px solid #f1f1f1;
      box-shadow: -1px -3px 9px 0px #bdbdbd;

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


      }
    }

    .wrapper {
      min-height: calc(100% - 73px);
      display: flex;
      flex-direction: column;
      width: 99%;
      /*       overflow-y: auto; 
      max-height: calc(100vh - 73px) */
      ;
    }

    .main {
      flex: 1;
      width: 100%;
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
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