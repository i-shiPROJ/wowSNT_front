import type { VotingOptions } from "./VotingOptions"

export interface Voitingitem {

  id: number|null,
  ordNum: number,
  wording: string,
    membersOnly: boolean,
      votingOptions: VotingOptions[]
            
}