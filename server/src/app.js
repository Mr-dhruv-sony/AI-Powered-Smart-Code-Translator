import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

// Allow React frontend to talk to this backend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
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