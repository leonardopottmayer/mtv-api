const Phrase = require("../models/phrase");
const User = require("../models/user");

const validatePhraseData = require("../helpers/validate-phrase-data");
const validateDocumentId = require("../helpers/validate-document-id");

module.exports = {
  getAllPhrases: async (req, res) => {
    try {
      const result = await Phrase.find({});
      return res.status(200).json({
        message: "Query completed successfully!",
        result: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  registerNewPhrase: async (req, res) => {
    const { phrase, author } = req.body;

    try {
      const newPhrase = new Phrase({
        phrase: phrase,
        author: author,
        postedBy: req.userId,
        updatedBy: req.userId,
      });

      let phraseValidationResult = await validatePhraseData(newPhrase);

      if (phraseValidationResult != "OK") {
        return res.status(400).json({
          message: phraseValidationResult,
        });
      }

      await newPhrase.save();

      return res.status(200).json({
        message: "Successfully registered new phrase!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  getPhraseById: async (req, res) => {
    try {
      let idValidationResult = await validateDocumentId(req.params.phraseId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      const result = await Phrase.findById(req.params.phraseId);

      return res.status(200).json({
        message: "Query completed successfully!",
        result: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  deletePhraseById: async (req, res) => {
    let idValidationResult = await validateDocumentId(req.params.phraseId);

    if (idValidationResult != "OK") {
      return res.status(400).json({
        message: idValidationResult,
      });
    }

    Phrase.findByIdAndRemove(req.params.phraseId, (error) => {
      if (!error) {
        return res.status(200).json({
          message: "Successfully deleted phrase!",
        });
      } else {
        return res.status(500).json({
          message: "An error ocurred while processing your request!",
        });
      }
    });
  },

  updatePhraseById: async (req, res) => {
    const { phraseId, phrase, author } = req.body;

    try {
      let idValidationResult = await validateDocumentId(req.body.phraseId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      let phraseValidationResult = await validatePhraseData({
        phrase: phrase,
        author: author,
      });

      if (phraseValidationResult != "OK") {
        return res.status(400).json({
          message: phraseValidationResult,
        });
      }

      await Phrase.findOneAndUpdate(
        { _id: phraseId },
        {
          $set: {
            phrase: phrase,
            author: author,
            updatedAt: Date.now(),
            updatedBy: req.userId,
          },
        }
      );

      return res.status(200).json({
        message: "Successfully updated document!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      let idValidationResult = await validateDocumentId(req.params.userId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      const queryUser = await User.findById(req.params.userId);

      if (queryUser) {
        queryUser.password = undefined;
      }

      return res.status(200).json({
        message: "Successfully queried user!",
        result: queryUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  getActiveUsers: async (req, res) => {
    try {
      const users = await User.find({ waitingForAuthorization: false });

      for (let i = 0; i < users.length; i++) {
        const us = users[i];
        us.password = undefined;
      }

      return res.status(200).json({
        message: "Successfully queried users!",
        result: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  getWaitingUsers: async (req, res) => {
    try {
      const users = await User.find({ waitingForAuthorization: true });

      return res.status(200).json({
        message: "Successfully queried users!",
        result: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  blockUser: async (req, res) => {
    const { userId } = req.params;

    try {
      let idValidationResult = await validateDocumentId(userId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            waitingForAuthorization: true,
          },
        }
      );

      return res.status(200).json({
        message: "Successfully blocked user!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  unlockUser: async (req, res) => {
    const { userId } = req.params;

    try {
      let idValidationResult = await validateDocumentId(userId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            waitingForAuthorization: false,
          },
        }
      );

      return res.status(200).json({
        message: "Successfully unlocked user!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      let idValidationResult = await validateDocumentId(userId);

      if (idValidationResult != "OK") {
        return res.status(400).json({
          message: idValidationResult,
        });
      }

      await User.findByIdAndDelete({ _id: userId });

      return res.status(200).json({
        message: "Successfully deleted user!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error ocurred while processing your request!",
      });
    }
  },
};
