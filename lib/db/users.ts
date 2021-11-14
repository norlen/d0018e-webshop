import create_client from "./create_client";

export type user = {
  email: string;
  password: string;
};

export const find_user = async (email: string): Promise<user | undefined> => {
  const sql = `SELECT u.email,
                            u.password
                            FROM Users AS u
                            WHERE u.email=$1`;
  const client = create_client();
  let user = undefined;
  try {
    await client.connect();
    const res = await client.query(sql, [email]);
    user = res.rows[0];
  } catch (err) {
    console.error("ERROR find_user:", err);
  } finally {
    await client.end();
  }
  return user;
};
