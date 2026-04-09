const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
