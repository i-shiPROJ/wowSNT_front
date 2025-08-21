import { useUserStore } from '~/stores/userInfo';

export default defineNuxtRouteMiddleware(async (to) => {
  const token = sessionStorage.getItem('authToken');
  const userStore = useUserStore();
  
  if (!token && to.path !== '/auth/SignIn') {
    return navigateTo('/auth/SignIn')
  }

  // Если есть токен, но НЕТ информации о пользователе, загружаем её
  if (token && (!userStore.currentUser || Object.keys(userStore.currentUser).length === 0) && to.path !== '/auth/signIn') {
    try {
      await userStore.fetchUserInfo();
    } catch (error) {
      // Если не удалось загрузить информацию о пользователе, перенаправляем на логин
      return navigateTo('/auth/signIn');
    }
  }
}) 