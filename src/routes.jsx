import Home from "./pages/Home.jsx";
import Events from "./pages/Events.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/events", element: <Events /> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
