import type { Area } from "./Area.interface";
import type { Personinfo } from "./Personinfo.interface";

export interface Area_ownerships {
  area: Area,
  startDate: string
  endDate: string,
  id: number,
  part: string,
  person: Personinfo,
}