import mongoose from "mongoose";
import { type } from "os";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    pincode: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }, // By time stamp we tell when it was made and updated Mongoose automatically adds it.
);
// mongoose.models={}// because of tge below statement you don't ahve to do this

export default mongoose.models.User || mongoose.model("User", UserSchema);
