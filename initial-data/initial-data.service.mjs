import { Card } from "../handlers/cards/model/cardMongoose.mjs";
import { User } from "../handlers/users/model/userMongoose.mjs";
import { initialData as data } from "./initial-data.mjs";
import bcrypt from "bcrypt";

//Initializes the database with initial data if no users
export async function initializeData() {
  const userAmount = await User.find().countDocuments();

  if (!userAmount) {
    const userIds = [];
    // Iterate over each user
    for (const u of data.users) {
      const user = new User(u);
      user.password = await bcrypt.hash(user.password, 10);
      const obj = await user.save(); // Save the user to the database
      userIds.push(obj._id);
    }
    // Iterate over each card
    for (const c of data.cards) {
      const card = new Card(c);
      const i = Math.floor(Math.random() * userIds.length);
      card.user_id = userIds[i];
      await card.save(); // Save the card to the database
    }
  }
}
