import { defineStore } from 'pinia'

interface membershipsObj {
  id: number,
  snt: {
    id: number,
    inn: number,
    ogrn: number,
    regDate: string,
    title: string,
    oktmoCode: number,
    address: string
  },
  role: {
    code: string,
    name: string
  },
  beginDate: string,
  endDate: null,
  isApproved: boolean
};

interface areaOwnershipsObj {
  id: number,
  area: {
    id: number,
    snt: {
      id: number,
      inn: number,
      ogrn: number,
      regDate: string,
      title: string,
      oktmoCode: number,
      address: string
    },
    cadastralNum: string,
    square: string,
    residentsNum: string,
    street: string,
    houseNum: string
  },
  startDate: string,
  part: string,
  endDate: null
}

interface userInfo {
  id: number,
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNums: string,
  email: string,
  username: string,
  memberships: [membershipsObj],
  areaOwnerships: [areaOwnershipsObj]
};

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})