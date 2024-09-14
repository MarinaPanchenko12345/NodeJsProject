import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleErrors.mjs";

//Middleware to check if the user is authenticated.
//It verifies the JWT token provided in the Authorization header and adds the user object to the request if the token is valid.
export const guard = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return handleError(res, 401, "Authentication Error: Unauthorized user");
  }
  jwt.verify(authorization, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return handleError(res, 401, "Invalid token.");
    } else {
      req.user = user;
      next();
    }
  });
};

//Middleware to check if the user isBusiness
//It ensures the user has business or admin rights.
export const businessGuard = (req, res, next) => {
  const user = getUser(req);
  if (user?.isBusiness || user?.isAdmin) {
    next();
  } else {
    return handleError(
      res,
      401,
      "Authentication Error:  Access is allowed only to Business users or an Admin."
    );
  }
};

//Middleware to check if the user is an admin.
//It ensures that only admins can access the route.
export const adminGuard = (req, res, next) => {
  const user = getUser(req);
  if (user?.isAdmin) {
    next();
  } else {
    return handleError(
      res,
      401,
      "Authentication Error: Access is allowed only to an Admin."
    );
  }
};

//Retrieves the user object from the request  the token.
//It decodes the JWT token from the Authorization header and returns the user object
export const getUser = (req) => {
  if (!req.headers.authorization) {
    return null;
  }
  const user = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  if (!user) {
    return null;
  }
  return user;
};
