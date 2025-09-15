import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home/Home.jsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ],
        errorElement: <ErrorPage />
    }
];

export default routes;