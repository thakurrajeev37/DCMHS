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
		h1: {
			fontSize: "2.5rem",
			"@media (max-width:600px)": {
				fontSize: "2rem",
			},
		},
		h2: {
			fontSize: "2rem",
			"@media (max-width:600px)": {
				fontSize: "1.75rem",
			},
		},
		h3: {
			fontSize: "1.75rem",
			"@media (max-width:600px)": {
				fontSize: "1.5rem",
			},
		},
		h4: {
			fontSize: "1.5rem",
			"@media (max-width:600px)": {
				fontSize: "1.25rem",
			},
		},
		h5: {
			fontSize: "1.25rem",
			"@media (max-width:600px)": {
				fontSize: "1.1rem",
			},
		},
		h6: {
			fontSize: "1rem",
			"@media (max-width:600px)": {
				fontSize: "0.95rem",
			},
		},
		body1: {
			fontSize: "1rem",
			"@media (max-width:600px)": {
				fontSize: "0.9rem",
			},
		},
		body2: {
			fontSize: "0.875rem",
			"@media (max-width:600px)": {
				fontSize: "0.8rem",
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});

export default theme;
