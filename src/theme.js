import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: { main: "#3B6866" },
		secondary: { main: "#2d7a6e" },
		background: {
			default: "#ffffff",
			paper: "#f8fafc",
		},
	},
	typography: {
		fontFamily:
			"Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
	},
});

export default theme;
