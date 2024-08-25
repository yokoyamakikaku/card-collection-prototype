import { Link } from "react-router-dom";
import UrlWatcher from "../components/UrlWatcher";

export default function HomePage () {
  return (
    <div className="px-4">
      <section>
        <h1 className="text-6xl py-32 text-center">
          これは<span className="bg-black text-white">デモサイト</span>です
        </h1>
        <div className="max-w-4xl px-8 flex flex-col gap-4 mx-auto mb-12 text-center">
          <p>
            QRコードを使ってコレクションを楽しむためのWebアプリケーションのデモサイトです。
          </p>
        </div>
        <div className="flex max-w-2xl gap-4 mx-auto mb-12">
          <div className="w-full">
            <img className="w-full h-auto block" src="/public/read.webp" alt="" />
          </div>
          <div className="w-full">
            <img className="h-auto flex-grow flex-shrink-0" src="/public/talk.webp" alt="" />
          </div>
        </div>
        <div className="max-w-4xl px-8 flex flex-col gap-4 mx-auto">
          <p>
            生成されたQRコードを読み込むとこのページの右下にカードを取得したというメッセージが表示されます。
            表示されたボタンを押すことでカードを取得できます。
          </p>
        </div>
      </section>
      <section className="mt-24 max-w-4xl px-8 mx-auto">
        <h2 className="text-3xl py-12">名刺を使った利用の場合</h2>
        <div className="flex flex-col gap-4">
          <p>
            異なるQRコードを印刷した名刺を用意することで自分の名刺を中心にしたコミュニケーションが生まれます。
          </p>
          <p>
            複数人で異なるQRコードを見せ合うことでコレクションを進めることができます。
            また、スタンプがすべて集まった場合には特別なメッセージが表示される機能も考えています。ぜひ挑戦してみてください！
          </p>
        </div>
      </section>
      <section className="mt-24 text-center">
        <h2 className="text-5xl py-12">サンプル</h2>
        <p className="px-4 mb-12">サンプル用のQRコードを見ることができます。</p>
        <Link to="/sample" className="block p-4 max-w-72 text-sm bg-black text-white mx-auto">
          サンプルのQRコードを見る
        </Link>
      </section>
      <section className="mt-24 max-w-4xl px-8 mx-auto">
        <h2 className="text-3xl py-12 text-center">今後の予定と機能</h2>
        <div className="px-4 flex flex-col gap-4">
          <p>
            このデモサイトはまだ開発中ですが、今後は名刺を交換してスタンプを集める機能のほかにも、集めたスタンプの一覧を表示したり、他のユーザーと競い合ったりする機能を追加していく予定です。
          </p>
          <p>
            新しい機能のリリース情報やアップデート情報については、随時このサイトでお知らせしますので、お楽しみに！
          </p>
        </div>
      </section>
      <UrlWatcher />
    </div>
  );
}
