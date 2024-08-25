import { useMutation, useQuery } from "@tanstack/react-query"
import { createUserCard, listUserCards } from "../services/storage"

export function useListUserCardsQuery () {
  return useQuery({
    queryKey: ["user-cards"],
    queryFn: async () => {
      return listUserCards()
    }
  })
}

export function useCreateUserCardMutation () {
  return useMutation({
    mutationKey: ["user-cards"],
    async mutationFn (cardId: string) {
      return createUserCard(cardId)
    }
  })
}
