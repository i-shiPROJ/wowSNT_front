import type { SntInterface } from "./Snt.interface"
export interface Memberships {
  id: number,
  snt: SntInterface,
  role: {
    code: string,
    name: string
  },
  beginDate: string,
  endDate: null,
  isApproved: boolean
};
