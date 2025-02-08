
import type { Userinfo } from "~/stores/interface/userInfo";
export default defineNuxtPlugin(() => {

  const checkMemberShip = (userInfo: Userinfo) => {
    console.log('hhhhhhh', userInfo);
  };

  return {
    provide: {
      utils: {
        checkMemberShip: (userInfo: Userinfo) => { checkMemberShip(userInfo) }
      }
    }
  }
})