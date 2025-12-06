import express from "express";
import { addUser } from "./adduser.js";
import User from "./user.model.js";

const router = express.Router();

// POST → /adduser
router.post("/adduser", addUser);

// GET → /users (needed for Home.jsx)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
