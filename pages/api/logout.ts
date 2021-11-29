import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "pages/api/user";

const logoutRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  req.session.destroy();

  const emptyUser = {
    isLoggedIn: false,
    isAdmin: false,
    id: "",
    email: "",
    name: "",
  };
  res.status(200).json(emptyUser);
};

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
