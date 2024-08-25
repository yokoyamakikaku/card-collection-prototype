import { useState } from "react"

export type DialogProps <T> = {
  key: number
  opened: true
  data: T
  open: (data: T) => void
  close: () => void
} | {
  key: number
  opened: false
  data: null
  open: (data: T) => void
  close: () => void
}

export function useDialogWithData <T> (initialData: T | null): DialogProps<T> {
  const [key, setKey] = useState(0)
  const [data, setData] = useState<T | null>(initialData)

  const open = (data: T) => {
    setData(data)
    setKey(new Date().getTime())
  }
  const close = () => setData(null)

  if (data !== null) {
    return {
      key,
      opened: true,
      data: data,
      open,
      close,
    }
  }

  return {
    key,
    opened: false,
    data: null,
    open,
    close,
  }
}
