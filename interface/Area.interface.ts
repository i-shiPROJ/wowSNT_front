import type{ SntInterface } from "./Snt.interface"
export interface Area{
  id: number,
  snt: SntInterface,
  cadastralNum: string,
  square: number,
  residentsNum: number | 0,
  address: string
}