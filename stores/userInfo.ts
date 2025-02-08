import { defineStore } from 'pinia'
import type { Personinfo } from './interface/Personinfo';

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: {} as Personinfo,
  }),
  actions: {
    setUser(user: Personinfo) {
      this.currentUser = user;
    },
  }
})