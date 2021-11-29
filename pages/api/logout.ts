import { ApiResponse } from "@lib/api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { User } from "pages/api/user";

const logoutRoute = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) => {
  req.session.destroy();

  const emptyUser = {
    isLoggedIn: false,
    isAdmin: false,
    id: "",
    email: "",
    name: "",
  };
  res.status(200).json({ success: true, data: emptyUser });
};

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
