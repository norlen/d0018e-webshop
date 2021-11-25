import { getSingleRow, run } from "./connection";

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

export const addUser = async (
  name: string,
  email: string,
  password: string
): Promise<undefined> => {
  const sql = `
  INSERT INTO users (
    name,
    email,
    password
  )
  VALUES
    ($1, $2, $3)
  RETURNING id;
  `;

  let userId = undefined;
  await run(async (client) => {
    const res = await client.query(sql, [name, email, password]);
    if (res.rows.length > 0) {
      userId = res.rows[0].id;
    }
  });
  return userId;
};
