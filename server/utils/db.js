import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose.
 * Reads URI from process.env.MONGO_URI. Throws if missing.
 */
export async function connectMongo({ retries = 3, delayMs = 1000 } = {}) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[Mongo] Missing MONGODB_URI environment variable.");
    throw new Error("MONGODB_URI environment variable is required for database connection");
  }

  let attempt = 0;
  while (attempt <= retries) {
    try {
      attempt++;
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`[Mongo] Connected successfully (attempt ${attempt})`);
      return mongoose.connection;
    } catch (err) {
      const remaining = retries - attempt;
      console.error(`[Mongo] Connection attempt ${attempt} failed: ${err.message}`);
      if (remaining < 0) {
        // Exhausted all retries
        const finalError = new Error(`MongoDB connection failed after ${attempt} attempts`);
        // Attach original error for debugging
        finalError.cause = err;
        throw finalError;
      }
      // Wait before retrying
      await new Promise(res => setTimeout(res, delayMs));
      console.log(`[Mongo] Retrying... (${remaining} retries left)`);
    }
  }
}
