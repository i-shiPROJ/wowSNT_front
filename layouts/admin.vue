<template>
  <el-container class="common-layout">

    <wow-panel title="меню" position="right"></wow-panel>

    <el-aside width="200px" v-if="!isMobile">Aside</el-aside>

    <div class="">

    </div>
    
    <div :class="{'drawer-menu': true, 'drawer-menu-visible': drawerVisible}">
      меню
    </div>
    <el-container>
      <el-header>
        <div v-if="isMobile">
          <el-button @click="toggleMenu">Toggle Menu</el-button>
        </div>
        Header
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);
const drawerVisible = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

const toggleMenu = () => {
  drawerVisible.value = !drawerVisible.value; // Переключение состояния видимости
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
}

.drawer-menu {
  position: fixed; /* Фиксированное положение */
  top: 45px;
  left: 0;
  width: 200px; /* Ширина, соответствующая сайду */
  height: 100%; /* Полная высота */
  background-color: rgb(212, 192, 98); /* Цвет фона */
  transition: transform 0.3s ease; /* Плавный переход */
  transform: translateX(-100%); /* Скрытое состояние */
  z-index: 1000; /* Поверх всех элементов */
}

.drawer-menu-visible {
  transform: translateX(0); /* Показать элемент */
}

.drawer-content {
  padding: 20px;
}
</style>