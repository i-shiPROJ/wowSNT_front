export interface SolutionEdit {
  regRequest: {
    id: number | null,
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
    processDate: string | null
  },
  area: {
    id: number | null,
    cadastralNum: string,
    square: string,
    residentsNum: string | null,
    address: string
  },
  person: {
    id: number | null,
    lastName: string,
    firstName: string,
    patronymic: string,
    phoneNums: string,
    email: string
  },
  isPersonFromAnotherSnt: boolean,
  areaOwnership: {
    id: number | null,
    startDate: string,
    part: string,
    endDate: string | null
  },
  existingAreaOwnershipsDescr: string | null
}

