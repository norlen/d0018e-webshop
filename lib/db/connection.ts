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

export const run = async (f: (client: Client) => Promise<void>) => {
  const client = createClient();
  try {
    await client.connect();
    await f(client);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
};

export const getSingleRow = async <T>(
  sql: string,
  args: string[] | undefined = undefined
): Promise<T | undefined> => {
  let data: T | undefined = undefined;
  await run(async (client) => {
    const res = await client.query(sql, args);
    if (res.rows.length > 0) {
      data = res.rows[0];
    }
  });
  return data;
};

export const getMultipleRows = async <T>(
  sql: string,
  args: string[] | undefined = undefined
): Promise<T[]> => {
  let data: T[] = [];
  await run(async (client) => {
    const res = await client.query(sql, args);
    data = res.rows;
  });
  return data;
};

export const transactionSingleRow = async <T>(
  f: (client: Client) => Promise<T | undefined>
): Promise<T | undefined> => {
  const client = createClient();
  let data: T | undefined = undefined;
  try {
    await client.connect();
    await client.query("BEGIN");
    const res = await f(client);
    if (res) {
      data = res;
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    await client.end();
  }
  return data;
};
