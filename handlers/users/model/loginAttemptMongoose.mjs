import mongoose, { Schema } from "mongoose";

// Schema for login attempts
export const LoginAttemptSchema = new Schema({
  email: { type: String, required: true },
  attempts: { type: Number, required: true, default: 0 },
  lockUntil: Date,
});
export const LoginAttempt = mongoose.model("loginattempts", LoginAttemptSchema);
