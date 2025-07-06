import type { VotingOptions } from "./VotingOptions"

export interface Voitingitem {

  id: number,
  ordNum: number,
  wording: string,
    membersOnly: boolean,
      votingOptions: VotingOptions[]
            
}