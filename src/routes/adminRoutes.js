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
router.patch("/phrase", verifyToken, adminController.updatePhraseById);
router.get("/user/active", verifyToken, adminController.getActiveUsers);
router.get("/user/waiting", verifyToken, adminController.getWaitingUsers);
router.post("/user/:userId/block", verifyToken, adminController.blockUser);
router.post("/user/:userId/unlock", verifyToken, adminController.unlockUser);
router.delete("/user/:userId", verifyToken, adminController.deleteUser);
router.get("/user/:userId", verifyToken, adminController.getUserById);

module.exports = router;
