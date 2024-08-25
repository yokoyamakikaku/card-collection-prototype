import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/HomePage";
import Card from "./pages/CardPage";
import TimeLine from "./pages/TimeLinePage";
import Camera from "./pages/CameraPage";
import Layout from "./Layout";
import CardList from "./pages/CardListPage";

export const router = createBrowserRouter([
  {
    path: "/camera", element: <Camera />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", index: true, element: <Home />},
      { path: "card", element: <CardList /> },
      { path: "card/:cardId", element: <Card /> },
      { path: "timeline", element: <TimeLine />},
    ]
  }
]);
