export interface Memberships {
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
