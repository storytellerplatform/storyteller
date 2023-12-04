import { createBrowserRouter } from "react-router-dom";

import Root from "../root";
import ErrorPage from './../pages/Error';
import LoadingPage from "../pages/Loading";
import Collection from "../pages/Collection";
import Collect from "../pages/Collect";
import Home from "../pages/Home";

// todo: test完後復原
import Admin from "../pages/Admin";
import Musics from "../pages/Musics";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/error",
        element: <ErrorPage />,
      },
      {
        path: "/loading",
        element: <LoadingPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
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
            path: "/collection/:articleId/:emotionId",
            element: <Collect />,
          },
          {
            path: "/music",
            element: <Musics />,
          },
        ]
      }
    ],
  },
])

export default router;