import { UserCardModel } from "../../types";
import { parseUserCard } from "../model/userCard";
import { STORAGE_KEY_USER_CARD } from "./constants";
import { v4 as uuid } from 'uuid'

export function createUserCard (cardId: string, note?: string): UserCardModel {
  const userCard: UserCardModel = {
    id: uuid(),
    cardId: cardId,
    note: note ?? "",
    created: new Date().getTime(),
  }

  const currentUserCards = listUserCards();
  const currentUserMap = new Map(currentUserCards.map((userCard) => [userCard.cardId, userCard]));
  currentUserMap.set(cardId, userCard);

  const nextUserCards = Array.from(currentUserMap.values());
  const nextUserCardsJson = JSON.stringify(nextUserCards);
  localStorage.setItem(STORAGE_KEY_USER_CARD, nextUserCardsJson);

  return userCard;
}

export function listUserCards (): UserCardModel[] {
  const userCards: UserCardModel[] = []

  try {
    const rawData = localStorage.getItem(STORAGE_KEY_USER_CARD);
    if (rawData === null) {
      console.warn("No data found in localStorage.");
      return userCards;
    }

    const data = JSON.parse(rawData);
    if (!Array.isArray(data)) {
      console.error("Data is not an array.");
      return userCards;
    }

    for (const item of data) {
      try {
        const userCard = parseUserCard(item);
        userCards.push(userCard);
      } catch (error) {
        console.error("Failed to create UserCardModel:", error);
      }
    }
  } catch (error) {
    console.error("Failed to parse data from localStorage:", error);
  }

  return userCards;
}
