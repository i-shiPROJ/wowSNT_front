export interface Ownerships{
  id: number,
  area: {
    id: number,
    address: string,
    cadastralNum: string,
    residentsNum: string,
    square: string,
    snt: {
      id: number,
      inn: number,
      ogrn: number,
      regDate: string,
      title: string,
      oktmoCode: number,
      address: string
    },
    street: string,
    houseNum: string
  },
  startDate: string,
  part: string,
  endDate: null
}
