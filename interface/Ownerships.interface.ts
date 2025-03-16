import type { SntInterface } from "./Snt.interface"
export interface Ownerships{
  id: number,
  area: {
    id: number,
    address: string,
    cadastralNum: string,
    residentsNum: string,
    square: string,
    snt: SntInterface,
    street: string,
    houseNum: string
  },
  startDate: string,
  part: string,
  endDate: null
}
