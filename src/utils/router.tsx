import { createBrowserRouter } from "react-router-dom";

import Root from "../root";
import ErrorPage from './../pages/Error';
import Home from './../pages/Home';
import LoadingPage from "../pages/Loading";
import Music from '../pages/Music/index';
import Collection from "../pages/Collection";
import Collect from "../pages/Collect";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/music",
        element: <Music />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/collection/:id",
        element: <Collect />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
      {
        path: "/loading",
        element: <LoadingPage />,
      }
    ],
  },
])

export default router;