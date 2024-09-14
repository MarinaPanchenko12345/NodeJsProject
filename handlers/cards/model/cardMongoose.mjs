import mongoose, { Schema } from "mongoose";
import { generateBizNumber } from "../service/bizNumberGenerator.mjs";

// Schema for Address
const Address = new Schema({
  state: { type: String, default: "not defined" },
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: { type: Number, default: 0 },
});
// Schema for Image
const Image = new Schema({
  url: {
    type: String,
    default:
      "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg", // Default URL if no image
  },
  alt: {
    type: String,
    default: "card image", // Default text for the image.
  },
});
// Main Schema for Card
const cardSchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  phone: String,
  email: String,
  web: String,
  image: Image,
  address: Address,
  bizNumber: { type: Number, unique: true },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Middleware to generate a unique bizNumber before validation
cardSchema.pre("validate", async function (next) {
  if (!this.bizNumber) {
    this.bizNumber = await generateBizNumber();
  }
  next();
});

// Custom toJSON method to exclude isDeleted
cardSchema.methods.toJSON = function () {
  const cardObject = this.toObject(); // Convert to JS object.
  delete cardObject.isDeleted;
  return cardObject;
};

export const Card = mongoose.model("cards", cardSchema);
