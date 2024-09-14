import express from "express";
import { adminGuard, getUser, guard } from "../../../middlewares/guard.mjs";
import { registerValidation, loginValidation } from "../validation/authJoi.mjs";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  toggleBusinessStatus,
  updateUser,
  userLogin,
  userRegister,
} from "../service/userService.mjs";
import { generateToken } from "../service/generateToken.mjs";
import { handleBadRequest, handleError } from "../../../utils/handleErrors.mjs";
import { userUpdateValidation } from "../validation/userUpdateJoi.mjs";

const router = express.Router();

//*UsersEndPoints*//
//login
router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const { email, password } = req.body;
    const user = await userLogin(email, password);
    const token = generateToken(user);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Register
router.post("/", async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const newUser = await userRegister(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Get all users
router.get("/", guard, adminGuard, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Get user by id
router.get("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);
    const user = await getUserById(req.params.id, currentUser);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Edit user
router.put("/:id", guard, async (req, res) => {
  try {
    const { error } = userUpdateValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const currentUser = getUser(req);
    const updatedUser = await updateUser(req.params.id, currentUser, req.body);
    res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Change isBusiness status
router.patch("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);

    const updatedUser = await toggleBusinessStatus(req.params.id, currentUser);
    res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Delete user
router.delete("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);
    const deletedUser = await deleteUser(req.params.id, currentUser);
    res.send(deletedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
export default router;
