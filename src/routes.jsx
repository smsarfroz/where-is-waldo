import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home/Home.jsx";
import Games from "./Components/Games/Games.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/games",
                element: <Games />
            }
        ],
        errorElement: <ErrorPage />
    }
];

export default routes;