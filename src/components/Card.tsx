import classNames from "classnames"
import { CardModelWithStatus } from "../types"
import React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  card: CardModelWithStatus;
}

export default function Card({
  card,
  ...props
}: CardProps) {
  const got = card.status === "GOT"
  
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        "border-2 rounded-lg flex p-4 gap-4 flex-col",
        {
          "cursor-pointer hover:bg-gray-50": typeof props.onClick === "function",
          "border-gray-100": !got,
          "border-gray-200 border-b-4": got
        }
      )}>
      <div className="w-full self-center">
        <div
          className="relative rounded-sm overflow-hidden bg-gray-100"
          style={{
            paddingBlockStart: '100%'
          }}>
          {got && (
            <img
              src={card.image}
              className="absolute w-full h-full top-0 left-0 object-cover" />
          )}
        </div>
      </div>
      <div className="text-center font-bold text-lg">
        {got ? (
          card.title
        ) : (
          <span className="w-16 rounded-lg bg-gray-100 h-2 inline-block" />
        )}
      </div>
    </div>
  )
}
