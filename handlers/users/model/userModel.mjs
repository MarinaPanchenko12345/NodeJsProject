import bcrypt from "bcrypt";
import { User } from "./userMongoose.mjs";

 //Creates a user object based on the request body.
export const createUserObject = async (body) => {
  return new User({
    name: {
      first: body.name.first,
      middle: body.name.middle,
      last: body.name.last,
    },
    phone: body.phone,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
    isBusiness: body.isBusiness,
    image: {
      url: body.image?.url || undefined,
      alt: body.image?.alt || undefined,
    },
    address: {
      state: body.address.state,
      country: body.address.country,
      city: body.address.city,
      street: body.address.street,
      houseNumber: body.address.houseNumber,
      zip: body.address.zip,
    },
  });
};

