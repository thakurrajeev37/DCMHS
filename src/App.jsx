import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes.jsx";
import { observer } from "mobx-react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function AppImpl() {
	const element = useRoutes(routes);


	return (
		<div
			style={{
				fontFamily:
					"system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
				padding: 0,
				margin: 0,
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				maxWidth: "100vw",
				overflowX: "hidden",
			}}
		>
			<Header />
			<main style={{ flex: 1, width: "100%", overflowX: "hidden" }}>
				<div style={{ width: "100%", overflowX: "hidden" }}>{element}</div>
			</main>
			<Footer />
		</div>
	);
}

const App = observer(AppImpl);
export default App;
