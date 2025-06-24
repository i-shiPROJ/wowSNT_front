interface votingOptions{
  id: number,
  ordNum: number,
  wording: string
}

export interface Voitingitem {

  id: number,
  ordNum: number,
  wording: string,
    membersOnly: boolean,
      votingOptions: [votingOptions]
            
}