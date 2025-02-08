import type { Memberships } from "./Memberships";
import type { Ownerships } from "./Ownerships";

export interface Personinfo{
  id: number,
  lastName: string,
  firstName: string,
  patronymic: string,
  phoneNums: string,
  email: string,
  username: string,
  memberships: [Memberships],
  areaOwnerships: [Ownerships]
}

