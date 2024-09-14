import express from "express";
import {
  guard,
  getUser,
  businessGuard,
  adminGuard,
} from "../../../middlewares/guard.mjs";
import { CardValidation } from "../validation/cardJoi.mjs";
import { createCardObject } from "../model/cardModel.mjs";
import { handleBadRequest, handleError } from "../../../utils/handleErrors.mjs";
import {
  getAllCards,
  getUserCards,
  getCardById,
  createNewCard,
  updateCard,
  toggleCardLike,
  changeBizNumber,
  deleteCard,
} from "../service/cardService.mjs";

const router = express.Router();

//*CardsEndPoints*//
//Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await getAllCards();
    res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Get user cards
router.get("/my-cards", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const cards = await getUserCards(user._id);
    res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Get card by id
router.get("/:id", async (req, res) => {
  try {
    const card = await getCardById(req.params.id);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Create new card
router.post("/", guard, businessGuard, async (req, res) => {
  try {
    const { error } = CardValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const cardData = createCardObject(req);
    const newCard = await createNewCard(cardData);
    res.status(201).send(newCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Edit card
router.put("/:id", guard, async (req, res) => {
  try {
    const { error } = CardValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const user = getUser(req);
    const updatedCard = await updateCard(req.params.id, user._id, req.body);
    res.send(updatedCard);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Like/dislike card
router.patch("/:id", guard, async (req, res) => {
  try {
    const card = await toggleCardLike(req.params.id, getUser(req)._id);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Change bizNumber
router.patch("/biz-number/:id", guard, adminGuard, async (req, res) => {
  try {
    const card = await changeBizNumber(req.params.id, req.body.bizNumber);
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Delete card
router.delete("/:id", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const card = await deleteCard(
      req.params.id,
      user._id,
      user.isAdmin,
    );
    res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

export default router;
