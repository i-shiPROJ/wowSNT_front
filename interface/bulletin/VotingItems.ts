import type { VotingOptions } from "./VotingOptions";

export interface Voitingitem {
  votingItemId: number,
  wording: string,
  resultVoting: number | string,
  votingOptions: VotingOptions[]
}