import { Client } from "pg";

const create_client = (): Client => {
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

export default create_client;
