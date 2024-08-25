import { useEffect, useMemo, useState } from "react"
import { BiChevronRight } from "react-icons/bi"

import { CardModel } from "../types"
import QrCode from "./QrCode"
import { DialogProps } from "../hooks/ui"

export default function CardDialog ({
  data: card,
  opened,
  close
}: DialogProps<CardModel>) {
  const [qrOpened, setQrOpened] = useState<boolean>(false)

  const shareUrl = useMemo(() => {
    if (!card) return
    const url = new URL(window.location.href)
    url.searchParams.set("key", card.key)
    return url.toString()
  }, [card])

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [opened])

  if (!card) return null

  return (
    <>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="fixed inset-0 overflow-auto items-center justify-center py-12" onClick={close}>
        <div
          onClick={e => e.stopPropagation()}
          className="relative bg-white rounded-lg shadow-xl py-4 mx-auto max-w-sm mb-12">
          <div className="w-40 h-40 overflow-hidden rounded-sm mx-auto my-8">
            <img
              className="w-full h-full object-cover block"
              src={card.image} alt={card.title} />
          </div>
          <div className="text-center font-bold text-2xl mb-4">
            {card.title}
          </div>
          <div className="px-4 text-justify">
            {card.description}
          </div>
          {typeof shareUrl === 'string' && (
            <div className="py-4 px-2">
              <button className="text-md flex" onClick={() => setQrOpened(v => !v)}>
                <BiChevronRight size={"1.5rem"} />
                <span className="flex-grow">カードを人にあげる</span>
              </button>
              {qrOpened && (
                <div className="flex justify-center">
                  <QrCode
                    text={shareUrl}
                    width={300} height={300} />
                </div>
              )}
            </div>
          )}
          <div className="px-4">
            <button
              onClick={close}
              className="bg-gray-100 rounded text-center w-full text-lg p-2">
                閉じる
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
