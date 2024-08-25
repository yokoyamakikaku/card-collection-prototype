import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/HomePage";
import Layout from "./Layout";
import CardList from "./pages/CardListPage";
import QrCodeListPage from "./pages/QrCodeListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", index: true, element: <Home />},
      { path: "card", element: <CardList /> },
      { path: "sample", element: <QrCodeListPage /> }
    ]
  }
]);
