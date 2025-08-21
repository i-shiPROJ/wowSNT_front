import type { Voitingitem } from "./VoitingItem";
import type { Files } from "../Files";

export interface Meeting {

  id: number | null,
  sntId: number,
  meetingDate: string,
  protocolNum: string,
  venue: string,
  meetingTypeCode: string,
  votingFormCode: string,
  votingTypeCode: string,
  votingStartDate: string,
  votingEndDate: string,
  votingItems: Voitingitem[],
  files: Files[],
  isUsed:boolean
}


