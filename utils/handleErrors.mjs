// Function to send an error response
export const handleError = (res, status, message) => {
  return res.status(status).send(message);
};

// Universal error handler for bad requests (400), including Joi and Mongoose errors
export const handleBadRequest = (res, error) => {
  let errorMessage;
  let validatorType;
  // Check if the error is from Joi
  if (error.isJoi) {
    errorMessage = error.details
      ? error.details.map((detail) => detail.message).join(", ")
      : error.message;
    validatorType = "Joi";
    // Check if the error is a Mongoose validation error
  } else if (error.name === "ValidationError") {
    errorMessage = error.message;
    validatorType = "Mongoose";
  } else {
    errorMessage = error.message;
    validatorType = "Unknown";
  }

  res.status(400).json({ error: `${validatorType} Error: ${errorMessage}` });
};
