require("dotenv").config({ path: `.env.development` });
const express = require("express"),
  cors = require("cors"),
  path = require("path"),
  app = express();

//OAS (OpenAPI Specification) 3.1.0
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  oas_conf = require("./oas"),
  specs = swaggerJsdoc(oas_conf);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Default Routes
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "/public")));

// App Routes
const router_prd = require("./api/routes/product");
const router_sec = require("./api/routes/security");
const router_avlt = require("./api/routes/avaliations");
const router_cat = require("./api/routes/category");
app.use("/api", router_prd);
app.use("/api", router_sec);
app.use("/api", router_avlt);
app.use("/api", router_cat);

// Start server
let port = process.env.PORT || 3000;
app.listen(port);