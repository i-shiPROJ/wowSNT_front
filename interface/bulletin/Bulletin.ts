import type { Voitingitem } from "./votingItems"
export interface Bulletin {
  meetingId: number,
  personId: number,
  votingItems: Voitingitem[]
}