import { NextApiRequest, NextApiResponse } from "next";
import { findUser, addUser } from "@lib/db/users";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcrypt";

import type { User } from "./user";

const validate = (name: string, email: string, password: string): boolean => {
  const check = (f: string) => !!f && typeof f === "string" && f.length > 5;
  return check(email) && check(password) && check(name);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = await req.body;

  try {
    if (!validate(name, email, password)) {
      throw Error("Felaktigt användarnamn, email eller lösenord");
    }

    const userData = await findUser(email);
    if (userData !== undefined) {
      // Case one user exist with that mail. return "user with that email already exist to client."
      throw Error("Användare med den mailen existerar redan");
    }
    // Need to hash the password before insertion to db.
    const hashed_pass = await bcrypt.hash(password, 10);
    // Case two add user to database.
    const userId = await addUser(name, email, hashed_pass);

    if (userId === undefined) {
      throw Error("Internt Fel");
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
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);
