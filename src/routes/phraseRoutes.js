const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

const phraseController = require("../controllers/phraseController");

router.get("/randomPhrase", phraseController.getRandomPhrase);

module.exports = router;
