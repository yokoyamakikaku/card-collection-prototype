import { useEffect, useMemo } from "react";
import Card from "../components/Card";
import CardDialog from "../components/CardDialog";
import { useCards } from "../hooks/card";
import { useDialogWithData } from "../hooks/ui";
import { useCreateUserCardMutation, useListUserCardsQuery } from "../hooks/userCard";
import { CardModel, CardModelWithStatus, UserCardModel } from "../types";
import { useSearchParams } from "react-router-dom";

export default function CardListPage () {
  const dialog = useDialogWithData<CardModel>(null)
  const cards = useCards()

  const listQuery = useListUserCardsQuery()
  const createMutation = useCreateUserCardMutation()

  const cardsWithStatus = useMemo(() => {
    if (!listQuery.isSuccess) return null

    const cardsWithStatus: CardModelWithStatus[] = []
    const userCardByCardId: Record<string, UserCardModel> = {}
    for (const userCard of listQuery.data) {
      userCardByCardId[userCard.cardId] = userCard
    }

    for (const card of cards) {
      const userCard = userCardByCardId[card.id]
      cardsWithStatus.push({
        ...card,
        status: userCard ? 'GOT' : 'UNGET'
      })
    }

    return cardsWithStatus
  }, [cards, listQuery.data, listQuery.isSuccess])

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const key = searchParams.get("key")
    if (typeof key !== 'string') return

    const card = cards.find(card => card.key === key)
    if (!card) return

    const listUserCards = listQuery.data
    if (!listUserCards) return
    const userCard = listUserCards.find(userCard => userCard.cardId === card.id)
    if (userCard) return

    createMutation.mutate(card.id, {
      onSuccess: () => {
        listQuery.refetch()
      }
    })

  }, [cards, createMutation, listQuery, listQuery.data, searchParams])

  return (
    <div className="py-8">
      <div className="px-4">
        <h1 className="text-2xl font-bold">
          入手したカード一覧
        </h1>
      </div>
      <div className="max-w-4xl mx-auto">
        {cardsWithStatus && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4 pt-12 px-2">
            {cardsWithStatus.map((card) => (
              <Card
                key={card.id}
                onClick={
                  card.status === 'UNGET' ? undefined : () => dialog.open(card)
                }
                card={card} />
            ))}
          </div>
        )}
      </div>
      <CardDialog
        {...dialog} />
    </div>
  )
}
