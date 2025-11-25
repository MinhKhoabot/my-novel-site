// backend/src/server.js
import "dotenv/config";
console.log("DEBUG URI =", process.env.MONGODB_URI);
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import storyRoutes from "./routes/storyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Novel API is running");
});

app.use("/api/stories", storyRoutes);
app.use("/api/admin", adminRoutes);

// Start server
connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
