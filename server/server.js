import express from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/userRoutes.js";
import connectedDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
await connectedDB();

app.use(express.json());
app.use(cookieParser());

// ✅ Vercel-compatible CORS middleware
app.use((req, res, next) => {
  // Allow your Netlify frontend
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://shah-mini-auth.netlify.app",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

export default app;