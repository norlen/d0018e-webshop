import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "@lib/db/users";
import {
  ApiResponse,
  UserDoesNotExistError,
  writeErrorResponse,
} from "@lib/api";
import bcrypt from "bcrypt";
import Joi from "joi";
import type { User } from "./user";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().normalize().min(5).max(100),
});

const loginRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) => {
  try {
    const { email, password } = await schema.validateAsync(req.body);
    const userData = await findUser(email);

    // Check that the user exists and that the passwords match.
    if (
      userData === undefined ||
      !bcrypt.compareSync(password, userData.password)
    ) {
      throw UserDoesNotExistError();
    }

    const isAdmin = userData.role === "administrator" ? true : false;
    const user = {
      ...userData,
      isLoggedIn: true,
      isAdmin,
    } as User;

    // Save sesssion.
    req.session.user = user;
    await req.session.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    writeErrorResponse(res, error as Error);
  }
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
