require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const db_url = process.env.DATABASE_URL;
const db_ssl = process.env.PG_SSL == "true" ? true : false;
const env = process.env.NODE_ENV;
console.log("ENV:      ", env, "\nConnStr:  ", db_url, "\nDB SSL:   ", db_ssl);

const dbc = require("knex")({
  client: "pg",
  debug: false,
  connection: {
    connectionString: db_url,
    ssl: db_ssl,
  },
});

dbc
  .raw("SELECT * from usuario")
  .then(() => {
    console.log("PG Status: Connected");
  })
  .catch((e) => {
    console.log("PG Status: NOT connected");
    console.error(e.message);
  });

module.exports = dbc;
