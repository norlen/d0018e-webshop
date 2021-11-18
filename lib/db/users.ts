import create_client from "./create_client";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export const findUser = async (email: string): Promise<User | undefined> => {
  const sql = `
  SELECT u.id,
         u.email,
         u.name,
         u.password
  FROM users AS u
  WHERE u.email = $1;
  `;

  const client = create_client();
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
