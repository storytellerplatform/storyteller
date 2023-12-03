import { createBrowserRouter } from "react-router-dom";

import Root from "../root";
import ErrorPage from './../pages/Error';
import LoadingPage from "../pages/Loading";
import Collection from "../pages/Collection";
import Collect from "../pages/Collect";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import TestHome from "../pages/Home/testPage";

// todo: test完後復原
import Admin from "../pages/Admin";
import Musics from "../pages/Musics";

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
            element: <Musics />,
          },
        ]
      }
    ],
  },
])

export default router;