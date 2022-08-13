const validatePhraseData = async (data) => {
  let response = "";

  if (!data.phrase || data.phrase.trim() == "") {
    response = "Invalid phrase!";
    return response;
  }

  if (!data.author || data.author.trim() == "") {
    response = "Invalid author!";
    return response;
  }

  return "OK";
};

module.exports = validatePhraseData;
