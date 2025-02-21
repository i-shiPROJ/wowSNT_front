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
    }

  }
})