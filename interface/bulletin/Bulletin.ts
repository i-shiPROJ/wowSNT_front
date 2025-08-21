import type { Voitingitem } from "./VotingItems"
export interface Bulletin {
  meetingId: number,
  personId: number,
  isUsed:boolean,
  votingItems: Voitingitem[]
}