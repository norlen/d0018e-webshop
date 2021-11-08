import { Client } from "pg";

const create_client = (): Client => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
}

export default create_client;
