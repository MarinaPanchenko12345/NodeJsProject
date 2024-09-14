import express from "express";
const router = express.Router();

// Import route handlers for cards and users
import cards from "../handlers/cards/routes/cards.mjs";
import users from "../handlers/users/routes/users.mjs";
import authGoogle from "../handlers/authgoogle/routes/authGoogle.mjs";

router.use("/cards", cards);
router.use("/users", users);
router.use("/", authGoogle);

export default router;
