import express from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/userRoutes.js";
import connectedDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
await connectedDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://shah-mini-auth.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// ✅ CORS middleware for Vercel
app.use((req, res, next) => {
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

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});
