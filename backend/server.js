import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import supportRoutes from "./routes/supportRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", supportRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => console.error(err));
