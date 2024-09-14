import Joi from "joi";
import { getNames } from "country-list";

// List of countries including default ones
const countries = [...getNames(), "USA", "UK", "UAE"];

// Validation schema for Login
export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validation schema for Register
export const registerValidation = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(200).required().messages({
      "string.base": "First Name should be a string",
      "string.empty": "First Name cannot be empty",
      "string.min": "First Name should have at least 2 characters long",
      "string.max": "First Name should have no more than 200 characters long",
      "any.required": "First Name is a required",
    }),
    middle: Joi.string().min(2).max(200).allow("", null).messages({
      "string.base": "Middle Name should be a string",
      "string.empty": "Middle Name cannot be empty",
      "string.min": "Middle Name should have at least 2 characters long",
      "string.max": "Middle Name should have no more than 200 characters long",
      "any.required": "Middle Name is a required field",
    }),
    last: Joi.string().min(2).max(200).required().messages({
      "string.base": "Last Name should be a string",
      "string.empty": "Last Name cannot be empty",
      "string.min": "Last Name should have at least 2 characters long",
      "string.max": "Last Name should have no more than 200 characters long",
      "any.required": "Last Name is a required field",
    }),
  }),

  phone: Joi.string()
    .pattern(/^((\+972|972|0)( ?-?[0-9]{1,2})( ?-?[0-9]{3})( ?-?[0-9]{4}))$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a standard Israeli phone number",
      "string.empty": "Phone cannot be empty",
      "any.required": "Phone is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "org"] } })
    .pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    .min(7)
    .max(254)
    .required()
    .messages({
      "string.email": "Email must be a standard email address",
      "string.pattern.base": "Email must contain only standard characters",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{9,}$/
    )
    .min(9)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),

  image: Joi.object({
    url: Joi.string().uri().min(14).max(200).allow("", null).messages({
      "string.uri": "Image URL must be a standard URL",
      "string.min": "Image URL must be at least 14 characters long",
      "string.max": "Image URL must be at most 200 characters long",
      "any.required": "Image URL is required",
    }),
    alt: Joi.string().min(2).max(200).allow("", null).messages({
      "string.base": "Image alt must be a string",
      "string.empty": "Image alt cannot be empty",
      "string.min": "Image alt must be at least 2 characters long",
      "string.max": "Image alt must be at most 200 characters long",
      "any.required": "Image alt is required",
    }),
  }),

  address: Joi.object({
    state: Joi.string().min(2).max(200).allow("", null).messages({
      "string.base": "State must be a string",
      "string.min": "State must be at least 2 characters long",
      "string.max": "State must be at most 200 characters long",
    }),
    country: Joi.string()
      .valid(...countries)
      .required()
      .messages({
        "any.only": "Country must be a valid country",
        "string.empty": "Country cannot be empty",
        "any.required": "Country is required",
      }),
    city: Joi.string().min(2).max(200).required().messages({
      "string.base": "City must be a string",
      "string.empty": "City cannot be empty",
      "string.min": "City must be at least 2 characters long",
      "string.max": "City must be at most 200 characters long",
      "any.required": "City is required",
    }),
    street: Joi.string().min(2).max(200).required().messages({
      "string.base": "Street must be a string",
      "string.empty": "Street cannot be empty",
      "string.min": "Street must be at least 2 characters long",
      "string.max": "Street must be at most 200 characters long",
      "any.required": "Street is required",
    }),
    houseNumber: Joi.number()
      .integer()
      .min(1)
      .max(9999999999)
      .required()
      .messages({
        "number.base": "House number must be a number",
        "number.min": "House number must be at least 1",
        "number.max": "House number must be at most 10 digits long",
        "any.required": "House number is required",
      }),

    zip: Joi.number()
      .integer()
      .min(1)
      .max(9999999999)
      .allow("", null)
      .messages({
        "number.base": "ZIP must be a number",
        "number.min": "ZIP must be at least 1",
        "number.max": "ZIP must be at most 10 digits long",
        "any.required": "ZIP is required",
      }),
  }),

  isBusiness: Joi.boolean(),
});
