import { defineStore } from 'pinia'
import type { Personinfo } from '../interface/Personinfo.interface';

export const useUserStore = defineStore('user', {

  state: () => ({
    currentUser: {} as Personinfo,
  }),

  actions: {
    setUser(user: Personinfo) {
      this.currentUser = user;
    },

    logout() {
      this.currentUser = {} as Personinfo;
      sessionStorage.clear();
      navigateTo('/auth/signIn');
    },

    async fetchUserInfo() {
      
      try {
        const response = await $fetch<Personinfo>('/person/user-info', {
          baseURL: useRuntimeConfig().public.baseURL,
          method: 'GET'
        })
        this.currentUser = response;
        return response;
      } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
      }
    }

  }
})