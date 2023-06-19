import { createBrowserRouter } from "react-router-dom";
import MainGuard from "../guards/MainGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainGuard />,
  },
]);

export default router;
