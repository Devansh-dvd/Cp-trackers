import User from "./user.model.js";

export const addUser = async (req, res) => {
  try {
    const { username, codeforcesid, codechefid, leetcodeid } = req.body;

    const user = await User.create({
      username,
      codeforcesid,
      codechefid,
      leetcodeid,
    });

    res.status(201).json({ message: "User added", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
