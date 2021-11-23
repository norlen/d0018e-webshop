import { getSingleRow } from "./connection";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
};

export const findUser = async (email: string): Promise<User | undefined> => {
  const sql = `
  SELECT u.id,
         u.email,
         u.name,
         u.password,
         u.role
  FROM users AS u
  WHERE u.email = $1;
  `;

  return await getSingleRow(sql, [email]);
};
