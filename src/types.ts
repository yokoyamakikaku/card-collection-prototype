export interface CardModel {
  id: string
  key: string
  title: string
  description: string
  image: string
}

export interface UserCardModel {
  id: string
  cardId: string
  note: string
  created: number
}

export type CardStatus = 'GOT' | 'UNGET'

export interface CardModelWithStatus extends CardModel {
  status: CardStatus
}
