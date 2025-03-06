export default defineNuxtRouteMiddleware((to) => {
  const token = sessionStorage.getItem('authToken')
  
  if (!token && to.path !== '/auth/SignIn') {
    return navigateTo('/auth/SignIn')
  }
}) 