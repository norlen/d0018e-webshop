import { NextApiRequest, NextApiResponse } from "next";
import { findUser, addUser } from "@lib/db/users";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { ApiInternalError, writeErrorResponse } from "@lib/api";
import bcrypt from "bcrypt";
import Joi from "joi";

import type { User } from "./user";

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().normalize().min(5).max(100).required(),
  password: Joi.string().normalize().min(5).max(100).required(),
});

const signupRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, name, password } = await schema.validateAsync(req.body);

    // Check if this user already exists.
    if ((await findUser(email)) !== undefined) {
      throw Error("Användare med den mailen existerar redan");
    }

    // Hash password and create the user.
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await addUser(name, email, hashedPassword);

    // If we didn't get back a valid user id, something unexpected happened so let the user
    // try again later.
    if (userId === undefined) {
      throw ApiInternalError();
    }

    const user = {
      isLoggedIn: true,
      isAdmin: false,
      email: email,
      name: name,
      id: userId,
      role: "customer",
    } as User;

    // Save sesssion.
    req.session.user = user;
    await req.session.save();
    res.status(200).json(user);
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(signupRoute, sessionOptions);
