import { CardModel } from "../../types"

export function createShareUrl (card: CardModel) {
  const origin = window.location.origin
  const key = card.key
  const url = new URL(origin)
  url.searchParams.set('key', key)
  return url
}
