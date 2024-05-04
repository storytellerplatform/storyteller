import { createBrowserRouter } from "react-router-dom";

import Root from "../root";
import ErrorPage from './../pages/Error';
import LoadingPage from "../pages/Loading";
import Collection from "../pages/Collection";
import Collect from "../pages/Collect";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Musics from "../pages/Musics";
import About from "../pages/About";
import FreeMusics from "../pages/FreeMusic";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Admin />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/collection",
            element: <Collection />,
          },
          {
            path: "/collection/:articleId/:audioId",
            element: <Collect />,
          },
          {
            path: "/music",
            element: <Musics />,
          },
          {
            path: "/error",
            element: <ErrorPage />,
          },
          {
            path: "/loading",
            element: <LoadingPage />,
          },
          {
            path: "/freemusic",
            element: <FreeMusics />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ]
      }
    ]
  },
])

export default router;