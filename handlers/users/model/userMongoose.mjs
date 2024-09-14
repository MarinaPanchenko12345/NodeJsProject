import mongoose, { Schema } from "mongoose";

// Schema for Name
const Name = new Schema({
  first: String,
  middle: { type: String, default: "" },
  last: String,
});
// Schema for Image
const Image = new Schema({
  url: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
  },
  alt: {
    type: String,
    default: "user image",
  },
});
// Schema for Address
const Address = new Schema({
  state: { type: String, default: "not defined" },
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: { type: Number, default: 0 },
});
// Main Schema for User
export const userSchema = new Schema({
  name: Name,
  phone: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Custom toJSON method to exclude isDeleted
userSchema.methods.toJSON = function () {
  const userObject = this.toObject(); // Convert to JS object.
  delete userObject.isDeleted;
  return userObject;
};
export const User = mongoose.model("users", userSchema);
