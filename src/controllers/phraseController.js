const Phrase = require("../models/phrase");
const manualPhrases = require("../phrases.json");

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

  insertPhrasesManually: async (req, res) => {
    manualPhrases.result.forEach(async (item) => {
      await Phrase.create({author: item.author, phrase: item.phrase, postedAt: item.postedAt, postedBy: item.postedBy, updatedAt: item.updatedAt, updatedBy: item.updatedBy})
    })
  },
};
