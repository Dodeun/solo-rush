import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Home from "./pages/Home/Home.tsx";
import TierList from "./pages/TierList/TierList.tsx";

const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/tierlist/:tierListId",
                element: <TierList />,
            },
        ],
    },
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
