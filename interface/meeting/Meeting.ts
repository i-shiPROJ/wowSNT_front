import type { Voitingitem } from "./VoitingItem"

export interface Meeting {

  id: number,
  sntId: number,
  meetingDate: string,
  protocolNum: string,
  venue: string,
  meetingTypeCode: string,
  votingFormCode: string,
  votingTypeCode: string,
  votingStartDate: string,
  votingEndDate: string,
  votingItems: [Voitingitem]
}


