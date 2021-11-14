import type { User } from './user'

import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { find_user } from '@lib/db/users'
import bcrypt from 'bcrypt';

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;
  try {
    const user_data = await find_user(email);
    if ( !(user_data?.email || user_data?.password) || !bcrypt.compareSync(password, user_data?.password) ) {
        throw Error("User with that combination of email and password does not exists!");
    } 
    const user = { isLoggedIn: true, login: email } as User
    req.session.user = user
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}