import type { VotingOptions } from "./VotingOptions"

export interface Voitingitem {

  id: number|null,
  ordNum: number,
  resultVoting: number | string,
  wording: string,
    membersOnly: boolean,
      votingOptions: VotingOptions[]
            
}