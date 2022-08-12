const User = require("../models/user");

module.exports = {
  getCurrentUser: async (req, res) => {
    return res.status(200).json({ user: "me" });
  },
};
