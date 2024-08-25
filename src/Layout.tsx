import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <div className="flex flex-row justify-between flex-wrap">
        <Link to="/" className="font-bold text-2xl p-4">
          デモサイト
        </Link>
        <div className="flex gap-2 items-center p-2">
          <Link
            className="text-gray-700 p-2 min-w-16 text-center hover:bg-gray-50 rounded-sm"
            to={"/card"}>
            私のカード
          </Link>
          <Link
            className="text-gray-700 p-2 min-w-16 text-center hover:bg-gray-50 rounded-sm"
            to={"#contact"}>
            問い合わせ
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
