export interface Area{
  id: number,
  snt: {
      id: number,
      inn: string,
      ogrn: string,
      regDate: string,
      title: string,
      oktmoCode: string,
      address: string
  },
  cadastralNum: string,
  square: number,
  residentsNum: number | 0,
  address: string
}