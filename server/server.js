import express from "express";
import authRoutes from "./routes/auth_routes.js";
import userRoutes from "./routes/userRoutes.js";
import connectedDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
await connectedDB();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serving running on ${PORT} port`);
});
