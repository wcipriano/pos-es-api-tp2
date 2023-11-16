require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const router_prd = require("./api/routes/product");
const router_sec = require("./api/routes/security");
const router_avlt = require("./api/routes/avaliations");
app.use("/api", router_prd);
app.use("/api", router_sec);
app.use("/api", router_avlt);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "/public")));

let port = process.env.PORT || 3000;
app.listen(port);
