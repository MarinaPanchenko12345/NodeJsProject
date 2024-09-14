import express from "express";
import passport from "passport";
import session from "express-session";
import "../service/passportGoogle.mjs";
import { sendAuthPage, sendProtectedPage } from "../../../utils/htmlGoogle.mjs";

const router = express.Router();

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

// Session setup
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Initialize Passport and sessions
router.use(passport.initialize());
router.use(passport.session());

// Route for the main page with a link to Google authentication
router.get("/", sendAuthPage);

// Route for Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Route for handling the callback after authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    const token = req.user.token;
    res.cookie("jwt", token, { httpOnly: true, secure: true });
    res.redirect("/protected");
  }
);

// Separate route to check protected access
router.get("/protected", isLoggedIn, sendProtectedPage);

// API route to return user data
router.get("/user-info", isLoggedIn, (req, res) => {
  if (req.user && req.user.name) {
    const firstName = req.user.name.first;
    const lastName = req.user.name.last || "";
    res.json({
      name: `${firstName} ${lastName}`,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// Route to log out and redirect to the main page
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to destroy session." });
      }
      res.clearCookie("jwt");
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

export default router;
