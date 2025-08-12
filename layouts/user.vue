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
            <wow-bell />

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
            <slot name="main" />
            <!-- <div class="fc fc-row fc-wrap fc-justify-space-b">
              <wow-card-col v-for="(item, index) in items" :key="index" :xs="1" :sm="2" :md="3" :lg="4" :xl="5">
                <template #header>Header {{ item }}</template>
                <template #body>Body {{ item }}</template>
              </wow-card-col>
            </div> -->

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
import { menuObject } from '~/pages/admin/menuObject';
import { useUserStore } from '~/stores/userInfo';
import { useMobileStore } from '~/stores/mobileInfo';
import { mdiNetworkPos, mdiCheckboxMarkedCircleAutoOutline, mdiTextureBox, mdiMessageReplyTextOutline, mdiCogOutline, mdiCardAccountDetailsOutline, mdiCashRegister, 
  mdiAccountGroup, mdiCitySwitch,
  mdiSafeSquareOutline, mdiTreeOutline, mdiChartBar, mdiMonitorDashboard, mdiMenu, mdiLeak } from '@mdi/js';


import type { Memberships } from '~/interface/Memberships.interface';
import type { Personinfo } from '~/interface/Personinfo.interface';
import { v6 as uuidv6 } from 'uuid';

import { useRouter } from 'vue-router';
import mdi from '~/plugins/mdi';
const router = useRouter();
const route = useRoute();

const userInfoStore = useUserStore();
const mobileStore = useMobileStore();


onBeforeMount(async () => {
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
//reactiveObjectMenu


let objectMenu: Array<MenuSettings> = reactive(menuObject);

onMounted(() => {

  checkMobile();
  window.addEventListener('resize', checkMobile);
  document.addEventListener('click', handleClickOutside); // Добавляем обработчик клика
  setMenu();
});


interface MenuSettings {
  type: string;
  id: string;
  settings: {
    active?: boolean;
    name: string;
    icon?: string;
    tooltip?: string;
    url?: string;
    functions?: {
      setActiveMenuItem: (id: any) => void;
    };
  };
}

const setMenu = () => {
  const getArraySTRole_p = () => {
    // Возвращаем первую найденную запись для управления СНТ, где есть роль
    const currentId = Number(route.params.adminid);
    return userInfoStore.currentUser.memberships
      ? userInfoStore.currentUser.memberships.find((item: Memberships) =>
        item.role?.code === 'ROLE_P' && item.snt?.id === currentId
      )
      : null;
  };

  const setActiveMenuItem = (id: string) => {
    let urlNavigate: string = '';

    objectMenu.forEach(item => {
      if (item.id === id && item.settings.url) {
        urlNavigate = item.settings.url;
      }
    });

    if (urlNavigate) {
      navigateTo(urlNavigate);
    }
  };

  const activeMenu = (id: string) => {
    return id === router.currentRoute.value.name ? true : false;
  };

  objectMenu.length = 0;
  const membership = getArraySTRole_p(); // Получаем первую запись

  objectMenu.push(
    {
      type: 'labelGroup',
      id: 'SntLabelRemove0',
      settings: {
        name: membership ? membership.snt.title : 'Нет роли', // Используем имя роли, если запись найдена
      },
    },
    {
      type: 'menuBtn',
      id: 'user',
      settings: {
        active: activeMenu('user'),
        name: 'Рабочий стол',
        icon: mdiNetworkPos,
        tooltip: 'Стол с основными виджетами',
        url: `/user`,
        functions: {
          setActiveMenuItem
        }
      },
    },
    {
      type: 'menuBtn',
      id: 'user-edit-user',
      settings: {
        active: activeMenu('user-edit-user'),
        name: 'Профиль',
        icon: mdiCheckboxMarkedCircleAutoOutline,
        url: `/user/edit-user`,
        functions: {
          setActiveMenuItem
        }
      },
    },
    
    {
      type: 'menuBtn',
      id: 'user-meetingvoting',
      settings: {
        active: activeMenu('user-meetingvoting'),
        name: 'Собрания и голосование',
        icon: mdiLeak,
        url: `/user/meetingvoting`,
        functions: {
          setActiveMenuItem
        }
      },
    },
    
  );
}

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
    overflow-y: auto;
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