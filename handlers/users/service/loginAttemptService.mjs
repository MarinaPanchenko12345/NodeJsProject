import { LoginAttempt } from "../model/loginAttemptMongoose.mjs";

//Checks if the user is currently locked out from logging in.
export const checkLoginAttempt = async (email) => {
  const loginAttempt = await LoginAttempt.findOne({ email });
  //Check if there is a lock and if the lock duration has not expired
  if (
    loginAttempt &&
    loginAttempt.lockUntil &&
    loginAttempt.lockUntil > Date.now()
  ) {
    return { locked: true, lockUntil: loginAttempt.lockUntil };
  }
  // Return the login attempt record and a flag indicating no lockout
  return { loginAttempt, locked: false };
};

//Increases the count of failed login attempts for a user and locks the account .
export const increaseLoginAttempt = async (email) => {
  let loginAttempt = await LoginAttempt.findOne({ email });
  if (loginAttempt) {
    loginAttempt.attempts += 1; // Increment the number of attempts
    if (loginAttempt.attempts >= 3) {
      loginAttempt.lockUntil = Date.now() + 24 * 60 * 60 * 1000; // Lock for 24 hours
    }
    await loginAttempt.save(); // Save the updated record
  } else {
    // Create a new login attempt record if none exists
    loginAttempt = await LoginAttempt.create({ email, attempts: 1 });
  }
  return loginAttempt;
};

//Resets the login attempt count and unlocks the user.
export const resetLoginAttempt = async (email) => {
  await LoginAttempt.deleteOne({ email });
};
