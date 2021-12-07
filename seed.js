const readline = require("readline");
const process = require("process");
const pg = require("pg");
const fs = require("fs");
const bcrypt = require("bcrypt");
require("dotenv").config();

const sqlQueries = fs.readFileSync("./db-data.sql", "utf8");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL must be set.");
  process.exit(1);
}

const options =
  process.env.DATABASE_USE_SSL && process.env.DATABASE_USE_SSL == "false"
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      };

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ...options,
});

rl.question("Please input admin email: ", (email) => {
  rl.question("Please input admin password: ", async (password) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      await client.connect();
      await client.query("BEGIN");
      await client.query(sqlQueries);
      await client.query(
        "INSERT INTO users (role, name, email, password) VALUES ('administrator', 'administrator', $1, $2);",
        [email, hashedPassword]
      );
      await client.query("COMMIT");
    } catch (error) {
      console.error(error);
      await client.query("ROLLBACK");
    } finally {
      await client.end();
    }

    console.log("Database seeding done.");
    process.exit(0);
  });
});
