import QrCode from '../components/QrCode'
import { cards } from '../data/cards'
import { createShareUrl } from '../services/model/card'

export default function QrCodeListPage () {
  return (
    <div className="py-12">
      <div className="px-12 mb-8">
        <h1 className="text-xl mb-4">QRコードの一覧</h1>
        <p className="mb-4">これはプロトタイプ用の内容です。実際は名刺やフライヤーなどにQRコードを記載して利用することを想定しています。</p>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4 pt-12 px-12">
        {cards.map(card => {
          return (
            <div key={card.key} className="card">
              <h2>{card.title}</h2>
              <QrCode
                text={createShareUrl(card).toString()}
                width={120} height={120} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
