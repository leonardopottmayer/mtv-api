const Phrase = require("../models/phrase");

module.exports = {
  getRandomPhrase: async (req, res) => {
    await Phrase.findOneRandom(function (err, result) {
      if (!err) {
        return res.status(200).json({
          message: "Found phrase successfully!",
          result: result,
        });
      } else {
        return res.statut(500).json({
          message: "An error ocurred while processing your request!",
        });
      }
    });
  },
};
