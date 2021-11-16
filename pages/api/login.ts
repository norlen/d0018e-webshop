import type { User } from "./user";

import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "@lib/db/users";
import bcrypt from "bcrypt";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  try {
    if (!(email && email.length > 3 && password && password.length > 0)) {
      throw Error("illegal input.");
    }
    const userData = await findUser(email);
    if (
      !(userData?.email || userData?.password) ||
      !bcrypt.compareSync(password, userData?.password)
    ) {
      throw Error(
        "User with that combination of email and password does not exists!"
      );
    }
    const user = {
      isLoggedIn: true,
      login: email,
      name: userData.name,
    } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
