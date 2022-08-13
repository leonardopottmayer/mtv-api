const mongoose = require("mongoose");
var random = require("mongoose-simple-random");

var phraseSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

phraseSchema.plugin(random);

const Phrase = mongoose.model("Phrase", phraseSchema);

module.exports = Phrase;
