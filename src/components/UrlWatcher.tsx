import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useListUserCardsQuery } from "../hooks/userCard";
import { useCards } from "../hooks/card";
import { CardModel, UserCardModel } from "../types";

export default function UrlWatcher () {
  const cards = useCards()
  const [searchParams] = useSearchParams()
  const listUserCardQuery = useListUserCardsQuery()
  const [gotCard, setGotCard] = useState<CardModel|null>(null)

  useEffect(() => {
    const value = searchParams.get("key")
    if (typeof value !== 'string') return
    if (!listUserCardQuery.isSuccess) return

    const key = value

    const userCards = listUserCardQuery.data
    const userCardByCardId: Record<string, UserCardModel> = {}
    for (const userCard of userCards) {
      userCardByCardId[userCard.cardId] = userCard
    }

    const cardByKey: Record<string, CardModel> = {}
    for (const card of cards) cardByKey[card.key] = card

    const card = cardByKey[key]
    if (!card) return

    const alreadyGot = userCardByCardId[card.id]
    if (alreadyGot) return

    setTimeout(() => { setGotCard(card) }, 1000)
  }, [searchParams, listUserCardQuery, cards])

  return (
    <>
      <div className={
        classNames("fixed h-0 w-full bottom-4 transition-all duration-1000", {
          "translate-x-0": gotCard,
          "translate-x-full": !gotCard
        })
      }>
        <div className="bg-gray-950 text-white p-4 rounded flex gap-4 absolute bottom-0 right-4 items-center ml-4">
          <div className="max-w-64">
            <div className="text-sm">
              名刺から訪問したのでカードを手に入れました
            </div>
          </div>
          <div className="shrink-0">
            <Link to={`/card?key=${gotCard?.key}`} className="p-2 hover:bg-gray-900 rounded-sm ">
              カードを見る
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
