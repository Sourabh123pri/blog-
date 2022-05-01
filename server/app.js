const express = require("express");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./router/routers");

// config file
dotenv.config({ path: "./config.env" });

// database
require("./DB/connection");

//port
const PORT = process.env.PORT || 2500;

const app = express();
app.use(cookiesParser());

// middwear
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);


// listen
app.listen(PORT, () => console.log(`server is runnig ${PORT}`));
