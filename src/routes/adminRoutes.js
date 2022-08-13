const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const verifyToken = require("../helpers/verify-token");

router.use(bodyParser.urlencoded({ extended: true }));

const adminController = require("../controllers/adminController");

router.get("/phrase/:phraseId", verifyToken, adminController.getPhraseById);
router.get("/phrase", verifyToken, adminController.getAllPhrases);
router.post("/phrase", verifyToken, adminController.registerNewPhrase);
router.delete("/phrase/:phraseId", verifyToken, adminController.deletePhraseById);
router.patch("/phrase", verifyToken, adminController.updatePhraseById)

module.exports = router;
