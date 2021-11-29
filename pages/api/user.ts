import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;
  name: string;
  id: string;
};

const emptyUser = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  name: "",
  id: "",
};

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    const user = {
      ...req.session.user,
      isLoggedIn: true,
      isAdmin: req.session.user.isAdmin,
      name: req.session.user.name,
    };

    res.status(200).json(user);
  } else {
    res.status(200).json(emptyUser);
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
