import mongoose, { Schema } from "mongoose";

const googleUserSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    unique: true,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const GoogleUser = mongoose.model("googleuser", googleUserSchema);
