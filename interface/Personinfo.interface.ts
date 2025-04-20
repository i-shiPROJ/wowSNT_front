import type { Memberships } from "./Memberships.interface";
import type { Ownerships } from "./Ownerships.interface";

export interface Personinfo{
  id: number,
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNum: string,
  phoneNums: [string],
  email: string,
  username: string,
  memberships: [Memberships],
  areaOwnerships: [Ownerships]
}

