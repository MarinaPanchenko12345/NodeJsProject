import { Card } from "../model/cardMongoose.mjs";

//Service for Get all cards
export const getAllCards = async () => {
  const cards = await Card.find({ isDeleted: { $ne: true } });
  if (cards.length === 0) {
    throw { status: 404, message: "Cards not found" };
  }
  return cards;
};

//Service for Get user cards
export const getUserCards = async (userId) => {
  const cards = await Card.find({ user_id: userId, isDeleted: { $ne: true } });
  if (cards.length === 0) {
    throw { status: 404, message: "Cards not found" };
  }
  return cards;
};

//Service for Get card by id
export const getCardById = async (cardId) => {
  const card = await Card.findOne({ _id: cardId, isDeleted: { $ne: true } });
  if (!card) {
    throw { status: 404, message: "Card not found" };
  }
  return card;
};

//Service for Create new card
export const createNewCard = async (cardData) => {
  const card = new Card(cardData);
  const newCard = await card.save();
  return newCard;
};

//Service for Edit card
export const updateCard = async (cardId, userId, cardData) => {
   const card = await getCardById(cardId);
  if (card.user_id.toString() !== userId.toString()) {
    throw {
      status: 403,
      message: "Access denied: Only the card owner can modify this card.",
    };
  }
  const updatedCard = await Card.findByIdAndUpdate(cardId, cardData, {
    new: true,
  });
  return updatedCard;
};

//Service for Like/dislike card
export const toggleCardLike = async (cardId, userId) => {
   const card = await getCardById(cardId);
  const likeIndex = card.likes.indexOf(userId);
  if (likeIndex > -1) {
    card.likes.splice(likeIndex, 1);
  } else {
    card.likes.push(userId);
  }
  await card.save();
  return card;
};

//Service for Change bizNumber
export const changeBizNumber = async (cardId, bizNumber) => {
  if (!/^\d{7}$/.test(bizNumber)) {
    throw { status: 400, message: "bizNumber must be exactly 7 digits long." };
  }
   const card = await getCardById(cardId);
  const existingCard = await Card.findOne({ bizNumber });
  if (existingCard && existingCard._id.toString() !== cardId) {
    throw {
      status: 403,
      message: "Provided bizNumber is already in use by another card.",
    };
  }
  card.bizNumber = bizNumber;
  await card.save();
  return card;
};

//Service for  Delete card
export const deleteCard = async (cardId, userId, isAdmin) => {
  const card = await Card.findOne({
    _id: cardId,
    isDeleted: { $ne: true },
  });
  if (!card) {
    throw { status: 404, message: "Card not found or already deleted" };
  }
  if (card.user_id.toString() !== userId.toString() && !isAdmin) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this card or an Admin.",
    };
  }
  await Card.findByIdAndUpdate(cardId, { isDeleted: true });
  return card;
};
