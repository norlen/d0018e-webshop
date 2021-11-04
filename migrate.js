var path = require("path");

var configuration = {
  migrationsDir: path.resolve(__dirname, "migrations"), // This is the directory that should contain your SQL migrations.
  host: process.env.POSTGRES_HOST, // Database host
  port: process.env.POSTGRES_PORT, // Database port
  db: process.env.POSTGRES_DB, // Database name
  user: process.env.POSTGRES_USER, // Database username
  password: process.env.POSTGRES_PASSWORD, // Database password
  adapter: "pg",
};

require("sql-migrations").run(configuration);
