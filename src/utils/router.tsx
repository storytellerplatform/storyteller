import { createBrowserRouter } from "react-router-dom";

import Root from "../root";
import ErrorPage from './../pages/Error';
import Home from './../pages/Home';
import LoadingPage from "../pages/Loading";
import Music from '../pages/Music/index';
import Collection from "../pages/Collection";
import Collect from "../pages/Collect";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import FreeMusic from "../pages/FreeMusic";
import TestHome from "../pages/Home/testPage";
import TestMusic from "../pages/Music/test";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/freemusic',
        element: <FreeMusic />,
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
        element: <Admin />,
        children: [
          {
            index: true,
            element: <TestHome />,
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
            element: <TestMusic />,
          },
        ]
      }
    ],
  },
])

export default router;