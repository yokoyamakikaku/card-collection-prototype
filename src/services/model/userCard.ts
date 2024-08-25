import { UserCardModel } from "../../types";

function isUserCardModel(data: unknown): data is UserCardModel {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.id === "string" &&
    typeof obj.cardId === "string" &&
    typeof obj.note === "string" &&
    typeof obj.created === "number"
  );
}

export function parseUserCard(data: unknown): UserCardModel {
  if (!isUserCardModel(data)) {
    throw new Error("Invalid data");
  }

  return {
    id: data.id,
    cardId: data.cardId,
    note: data.note,
    created: data.created,
  };
}
