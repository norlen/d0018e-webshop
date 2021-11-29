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

const userRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
      isAdmin: req.session.user.isAdmin,
      name: req.session.user.name,
    });
  } else {
    res.json({
      isLoggedIn: false,
      isAdmin: false,
      email: "",
      name: "",
      id: "",
    });
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
