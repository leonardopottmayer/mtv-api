const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const userController = require("../controllers/userController");

router.get("/current", userController.getCurrentUser);

module.exports = router;
