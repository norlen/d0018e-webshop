import { ApiInternalError } from "@lib/api";
import { Client } from "pg";

export const createClient = (): Client => {
  if (process.env.NODE_ENV === "development") {
    return new Client({
      connectionString: process.env.DATABASE_URL,
    });
  }

  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

export const run = async <T>(f: (client: Client) => Promise<T>) => {
  const client = createClient();
  try {
    await client.connect();
    const result = await f(client);
    await client.end();
    return result;
  } catch (err) {
    await client.end();
    console.error(err);
    throw err;
  }
};

export const getSingleRow = async <T>(
  sql: string,
  args: string[] | undefined = undefined
): Promise<T | undefined> => {
  let result = undefined;
  await run(async (client) => {
    const res = await client.query(sql, args);
    if (res.rows.length > 0) {
      result = res.rows[0];
    }
  });
  return result;
};

export const getMultipleRows = async <T>(
  sql: string,
  args: string[] | undefined = undefined
): Promise<T[]> => {
  return await run(async (client) => {
    const res = await client.query(sql, args);
    return res.rows;
  });
};

export const transactionSingleRow = async <T>(
  f: (client: Client) => Promise<T | undefined>
): Promise<T | undefined> => {
  const client = createClient();
  try {
    await client.connect();
    await client.query("BEGIN");
    const res = await f(client);
    await client.query("COMMIT");
    await client.end();
    return res;
  } catch (err) {
    await client.query("ROLLBACK");
    await client.end();
    console.error(err);
    throw err;
  }
};
