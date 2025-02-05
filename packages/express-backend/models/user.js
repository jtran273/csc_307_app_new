// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    job: { type: String, required: true },
  },
  {
    collection: "users_list", // This is the name of your MongoDB collection
  }
);

export default mongoose.model("User", userSchema);
