require("dotenv").config();
const db_url = process.env.DATABASE_URL;

const dbc = require("knex")({
  client: "pg",
  debug: false,
  connection: {
    connectionString: db_url,
    ssl: false,
  },
});

module.exports = dbc;
