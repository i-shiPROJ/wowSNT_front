export interface Ownerships{
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
