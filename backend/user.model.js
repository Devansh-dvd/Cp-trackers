import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  codeforcesid: { type: String, required: true },
  codechefid: { type: String, required: true },
  leetcodeid: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
