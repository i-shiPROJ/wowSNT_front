import { defineStore } from "pinia";

export const useMobileStore = defineStore('mobile', {

  state: () => ({
    isMobile: false as boolean
  }),

  actions: {
    setIsMobile(val: boolean) {
      this.isMobile = val;
    }
  }

})