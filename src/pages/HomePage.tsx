import UrlWatcher from "../components/UrlWatcher";

export default function HomePage () {
  return (
    <div className="py-24 px-4">
      <section className="text-center">
        <h1 className="text-7xl py-24">これはデモサイトです</h1>
        <img
          src="https://dummyimage.com/1200x400/cccccc/ffffff&text=メインビジュアル"
          alt="メインビジュアル"
          className="mx-auto my-12"
        />
        <p className="px-4">
          これはQRコードを使ってコレクションを楽しむためのWebアプリケーションのデモサイトです。
        </p>
        <p className="px-4">
          生成されたQRコードを読み込むと、このサイトが表示された後に画面右下にカードを取得したというメッセージが表示されている場合は、そのボタンをタップしてください。
        </p>
      </section>
      <section className="mt-24 text-center">
        <h2 className="text-5xl py-12">名刺とスタンプの交換方法</h2>
        <img
          src="https://dummyimage.com/800x400/cccccc/ffffff&text=交換方法の説明画像"
          alt="交換方法の説明画像"
          className="mx-auto my-12"
        />
        <p className="px-4">
          各名刺には異なるQRコードが印刷されており、それぞれのQRコードには固有のクエリストリングが含まれています。このクエリストリングは10種類のスタンプに対応しており、QRコードを読み取ると対応するスタンプが手に入ります。
        </p>
        <p className="px-4">
          名刺を持っている方は、他の名刺を持っている人に名刺を見せてもらうことで、異なるスタンプを集めることができます。名刺を持ち続けて他の人と交換し、コレクションを完成させましょう。
        </p>
        <p className="px-4">
          また、スタンプがすべて集まった場合には特別なメッセージが表示される機能も考えています。ぜひ挑戦してみてください！
        </p>
      </section>
      <section className="mt-24 text-center">
        <h2 className="text-5xl py-12">今後の予定と機能</h2>
        <img
          src="https://dummyimage.com/800x400/cccccc/ffffff&text=今後の機能説明画像"
          alt="今後の機能説明画像"
          className="mx-auto my-12"
        />
        <p className="px-4">
          このデモサイトはまだ開発中ですが、今後は名刺を交換してスタンプを集める機能のほかにも、集めたスタンプの一覧を表示したり、他のユーザーと競い合ったりする機能を追加していく予定です。
        </p>
        <p className="px-4">
          新しい機能のリリース情報やアップデート情報については、随時このサイトでお知らせしますので、お楽しみに！
        </p>
      </section>
      <section className="mt-24 text-center">
        <h2 className="text-5xl py-12">お問い合わせ</h2>
        <img
          src="https://dummyimage.com/600x300/cccccc/ffffff&text=お問い合わせセクション"
          alt="お問い合わせセクション"
          className="mx-auto my-12"
        />
        <p className="px-4">
          このプロジェクトに関する質問やご意見がございましたら、お気軽にお問い合わせください。
        </p>
      </section>
      <UrlWatcher />
    </div>
  );
}
