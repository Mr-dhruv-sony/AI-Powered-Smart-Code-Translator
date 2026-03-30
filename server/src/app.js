import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Allow React frontend to talk to this backend
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests and same-origin server calls
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// All routes mounted at /api
app.use("/api", routes);

// Handle unknown routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
