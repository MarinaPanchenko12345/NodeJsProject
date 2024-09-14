import bcrypt from "bcrypt";
import { User } from "../model/userMongoose.mjs";
import {
  checkLoginAttempt,
  increaseLoginAttempt,
  resetLoginAttempt,
} from "./loginAttemptService.mjs";
import { createUserObject } from "../model/userModel.mjs";

//Service for Login
export const userLogin = async (email, password, res) => {
  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) {
    throw { status: 403, message: "Invalid email or password" };
  }
  const { loginAttempt, locked } = await checkLoginAttempt(email); // Check if the account is not locked
  if (locked) {
    throw {
      status: 403,
      message: "Account is locked for 24 hours. Try again later.",
    };
  }
  if (!(await bcrypt.compare(password, user.password))) {
    await increaseLoginAttempt(email);
    throw { status: 403, message: "Invalid email or password" };
  }
  if (loginAttempt) {
    await resetLoginAttempt(email); // If login is successful reset a previous login attempt record
  }
  return user;
};

//Service for Register
export const userRegister = async (body) => {
  const existingUser = await User.findOne({ email: body.email }).select(
    "+isDeleted"
  );
  if (existingUser) {
    throw {
      status: 403,
      message: "Email already exists. Please choose another email.",
    };
  }
  const user = await createUserObject(body);
  return await user.save();
};

//Service for Get all users
export const getAllUsers = async () => {
  const users = await User.find({ isDeleted: { $ne: true } });
  if (users.length === 0) {
    throw {
      status: 404,
      message: "Users not found",
    };
  }
  return users;
};

//Service for Get user by id
export const getUserById = async (id, currentUser) => {
  const user = await User.findOne({ _id: id, isDeleted: { $ne: true } });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (
    !currentUser.isAdmin &&
    user._id.toString() !== currentUser._id.toString()
  ) {
    throw {
      status: 403,
      message:
        "Access denied: only the owner or an admin can access this user.",
    };
  }
  return user;
};

//Service for Edit user
export const updateUser = async (id, currentUser, updateData) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (user._id.toString() !== currentUser._id.toString()) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user.",
    };
  }
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
};

//Service for Change isBusiness status
export const toggleBusinessStatus = async (id, currentUser) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  if (user._id.toString() !== currentUser._id.toString()) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user.",
    };
  }
  user.isBusiness = !user.isBusiness;
  await user.save();
  return user;
};

//Service for Delete user
export const deleteUser = async (id, currentUser) => {
  const user = await User.findOne({
    _id: id,
    isDeleted: { $ne: true },
  });
  if (!user) {
    throw {
      status: 404,
      message: "User not found or already deleted",
    };
  }
  if (
    !currentUser.isAdmin &&
    user._id.toString() !== currentUser._id.toString()
  ) {
    throw {
      status: 403,
      message:
        "Access denied: Access is allowed only to the owner of this user or an Admin.",
    };
  }
  await User.findByIdAndUpdate(id, { isDeleted: true });
  return user;
};
