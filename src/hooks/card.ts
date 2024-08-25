import { useMemo } from "react";
import {cards as allCards} from "../data/cards";

export function useCards () {
  return useMemo(() => {
    return allCards
  }, [])
}
