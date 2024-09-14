import Joi from "joi";
import { getNames } from "country-list";

// List of countries including default ones
const countries = [...getNames(), "USA", "UK", "UAE"];

// Validation schema for card
export const CardValidation = Joi.object({
  title: Joi.string().min(2).max(200).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title must be at most 200 characters long",
    "any.required": "Title is required",
  }),
  subtitle: Joi.string().min(2).max(200).required().messages({
    "string.base": "Subtitle must be a string",
    "string.empty": "Subtitle cannot be empty",
    "string.min": "Subtitle must be at least 2 characters long",
    "string.max": "Subtitle must be at most 200 characters long",
    "any.required": "Subtitle is required",
  }),
  description: Joi.string().min(2).max(200).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 2 characters long",
    "string.max": "Description must be at most 200 characters long",
    "any.required": "Description is required",
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
      "string.email": "Email must be a valid email address",
      "string.pattern.base": "Email must contain only standard characters",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),

  web: Joi.string().uri().min(10).max(200).required().messages({
    "string.uri":
      "Web must be a standard URL,Web must be a valid URL, e.g., https://",
    "string.min": "Web must be at least 14 characters long",
    "any.required": "Web is required",
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
      "string.max": "City must be at most 256 characters long",
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
      .allow("", null)
      .messages({
        "number.base": "House number must be a number",
        "number.min": "House number must be at least 1",
        "number.max": "House number must be at most 10 digits long",
        "any.required": "House number is required",
      }),

    zip: Joi.number().integer().min(1).max(9999999999).required().messages({
      "number.base": "ZIP must be a number",
      "number.min": "ZIP must be at least 1",
      "number.max": "ZIP must be at most 10 digits long",
      "any.required": "ZIP is required",
    }),
  }),
});
