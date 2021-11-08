import { Client } from "pg";

var client;
if (client === undefined) {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  client.connect();
}

export default client as Client;