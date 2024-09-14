import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { generateToken } from "../../users/service/generateToken.mjs";
import { GoogleUser } from "../model/userGoogleMongoose.mjs";
import chalk from "chalk";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9898/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await GoogleUser.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await GoogleUser.create({
            name: {
              first: profile.name.givenName,
              last: profile.name.familyName,
            },
            email: profile.emails[0].value,
            isBusiness: false,
            isAdmin: false,
          });
        }

        const token = generateToken(user);
        console.log(chalk.magenta(`Google user token: ${token}`));

        return done(null, { user, token });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GoogleUser.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
