import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import compression from "compression";
import eventsRoutes from '../server/routes/events.js';
import { healthCheck } from "../server/controllers/healthController.js";

let cachedDb = null;

async function connectToDatabase() {
	if (cachedDb && mongoose.connection.readyState === 1) {
		return cachedDb;
	}

	const uri = process.env.MONGODB_URI;
	
	try {
		const connection = await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		});
		
		cachedDb = connection;
		console.log('[API] MongoDB connected successfully');
		return connection;
	} catch (error) {
		console.error('[API] MongoDB connection error:', error);
		throw error;
	}
}

const app = express();

// Parse JSON bodies for all requests
app.use(express.json());

// Basic security & performance middleware
app.use(
	helmet({
		contentSecurityPolicy: false,
	}),
);
app.use(compression());

// Ensure MongoDB connection before handling requests
app.use(async (req, res, next) => {
	try {
		await connectToDatabase();
		next();
	} catch (error) {
		console.error("MongoDB connection failed:", error);
		res.status(500).json({ error: "Database connection failed", details: error.message });
	}
});

// Events endpoints
app.use('/api/events', eventsRoutes);
// Health endpoints
app.get("/api/healthcheck", healthCheck);

// Central error handler
app.use((err, req, res, next) => {
	console.error("Unhandled error:", err);
	if (res.headersSent) return next(err);
	const body = { error: "Internal Server Error", details: err.message };
	res.status(err.status || 500).json(body);
});

// Export the Express app as a serverless function
export default app;
