import { getUser } from "../../../middlewares/guard.mjs";

 //Creates a card object based on the request body.
export const createCardObject = (req) => {
  return {
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
    web: req.body.web,
    image: {
      url: req.body.image?.url || undefined,
      alt: req.body.image?.alt || undefined,
    },
    address: {
      state: req.body.address.state,
      country: req.body.address.country,
      city: req.body.address.city,
      street: req.body.address.street,
      houseNumber: req.body.address.houseNumber,
      zip: req.body.address.zip,
    },
    user_id: getUser(req)?._id, // The ID of the user associated with the card
  };
};
