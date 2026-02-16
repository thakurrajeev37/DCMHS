import dotenv from 'dotenv';
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import express from "express";

// Load environment-specific config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const envFile = path.resolve(__dirname, `../.env.${env}`);

// Load env file if exists, otherwise use .env
if (fs.existsSync(envFile)) {
	dotenv.config({ path: envFile });
	console.log(`[Env] Loaded environment config from .env.${env}`);
} else {
	dotenv.config();
	console.log(`[Env] Loaded environment config from .env`);
}
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { healthCheck } from "./controllers/healthController.js";
import eventsRouter from "./routes/events.js";
// SSR moved into dedicated route module
import { createSsrMiddleware } from "./routes/ssrRoute.js";
import { initViteDevServer, initProdStatic } from "./utils/viteHelpers.js";

const isProd = process.env.NODE_ENV === "production";

async function createServer() {
	const app = express();
	// Parse JSON bodies for all requests
	app.use(express.json());

	// Basic security & performance middleware
	app.use(
		helmet({
			contentSecurityPolicy: false, // Keep simple for example; consider enabling with nonces in real apps
		}),
	);
	app.use(compression());
	app.use(morgan(isProd ? "combined" : "dev"));

	let vite;
	let template;



	if (!isProd) {
		({ vite, template } = await initViteDevServer(app));
	} else {
		// Initialize production static assets serving and template loading
		({ template } = await initProdStatic(app));
	}



	// Health endpoints (must come before SSR catch-all)
	app.get("/healthcheck", healthCheck);

	// API routes (must come before SSR catch-all)
	app.use("/api/events", eventsRouter);

	app.use("/", createSsrMiddleware({ vite, template, isProd }));

	// 404 handler (only reached if SSR middleware didn't handle)
	app.use((req, res, next) => {
		if (res.headersSent) return next();
		res.status(404).json({ error: "Not Found", path: req.originalUrl });
	});

	// Central error handler
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		console.error("Unhandled error:", err);
		if (res.headersSent) return next(err);
		const body = isProd
			? { error: "Internal Server Error" }
			: { error: "Internal Server Error", details: err?.stack || String(err) };
		res.status(err.status || 500).json(body);
	});

	const port = process.env.PORT || 3000;
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});
}

createServer();
