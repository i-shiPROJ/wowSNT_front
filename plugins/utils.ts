
// import type { Userinfo } from "~/stores/interface/";
export default defineNuxtPlugin(() => {

  // const checkMemberShip = (userInfo: Userinfo) => {
  // };

  return {
    provide: {
      utils: {
        // checkMemberShip: (userInfo: Userinfo) => { checkMemberShip(userInfo) }
      }
    }
  }
})