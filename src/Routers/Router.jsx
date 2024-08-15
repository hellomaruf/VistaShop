import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
  },
]);
