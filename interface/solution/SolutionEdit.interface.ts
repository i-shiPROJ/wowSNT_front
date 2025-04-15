import type { AreaOwnershipsDescr } from './AreaOwnershipsDescr.interface'
import type { Files } from '../Files'
export interface SolutionEdit {
  regRequest: {
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
    lastName: string,
    firstName: string,
    patronymic: string,
    phoneNum: string,
    email: string,
    requestDate: string,
    isProcessed: boolean,
    processDate: string | null,
    files: [Files]
  },
  area: {
    id: number | null,
    cadastralNum: string,
    square: number | 0,
    residentsNum: number | 0,
    address: string
  },
  person: {
    id: number | null,
    lastName: string,
    firstName: string,
    patronymic: string,
    phoneNum: string,
    phoneNums: string,
    email: string
  },
  isPersonFromAnotherSnt: boolean,
  areaOwnershipDescr: {
    id: number | null,
    part: number,
    startDate: string,
    endDate: string | null
  },
  existingAreaOwnershipsDescr: [AreaOwnershipsDescr]
}

