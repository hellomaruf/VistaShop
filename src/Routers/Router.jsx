import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/signin",
        element: <SignIn />,
        },
        {
            path: '/signup',
            element:<SignUp/>
      }
    ],
  },
]);
