require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./util/database");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./routes/authRoutes");
app.use("/auth", authRoute);

const phraseRoute = require("./routes/phraseRoutes");
app.use("/phrase", phraseRoute);

const adminRoute = require("./routes/adminRoutes");
app.use("/admin", adminRoute);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
