import mongoose from "mongoose";

//Generates a unique business number.
export const generateBizNumber = async () => {
  let bizNumber;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random business number between 1000000 and 9999999
    bizNumber = Math.floor(1000000 + Math.random() * 9000000);
    // Check if the generated number already exists
    const existingCard = await mongoose.models.cards.findOne({
      bizNumber: bizNumber,
    });
    if (!existingCard) {
      isUnique = true;
    }
  }
  return bizNumber;
};


