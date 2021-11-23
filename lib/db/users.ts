import createClient from "./createClient";

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

  const client = createClient();
  let user = undefined;
  try {
    await client.connect();
    const res = await client.query(sql, [email]);
    if (res.rows.length > 0) {
      user = res.rows[0];
    }
  } catch (err) {
    console.error("ERROR findUser:", err);
  } finally {
    await client.end();
  }
  return user;
};
