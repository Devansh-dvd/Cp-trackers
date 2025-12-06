import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// All routes inside user.routes.js should be under this:
app.use("/", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DBNAME })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));
