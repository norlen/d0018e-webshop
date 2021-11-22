import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "@lib/db/users";
import bcrypt from "bcrypt";

import type { User } from "./user";

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = await req.body;
  try {
    if (!validate(email, password)) {
      throw Error("Invalid username or password");
    }

    const userData = await findUser(email);
    if (
      userData === undefined ||
      userData.email === undefined ||
      userData.password === undefined
    ) {
      throw Error("internal error");
    }

    // Check if passwords match.
    if (!bcrypt.compareSync(password, userData.password)) {
      throw Error(
        "User with that combination of email and password does not exists!"
      );
    }

    const user = {
      isLoggedIn: true,
      email: userData.email,
      name: userData.name,
      id: userData.id,
    } as User;

    // Save sesssion.
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const validate = (email: string, password: string): boolean => {
  const check = (f: string) => !!f && typeof f === "string" && f.length > 5;
  return check(email) && check(password);
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
