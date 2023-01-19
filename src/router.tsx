import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import TodoDetail from "./components/TodoDetail";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "todo/:todoPk",
        element: <TodoDetail />,
      },
    ],
  },
]);

export default router;
