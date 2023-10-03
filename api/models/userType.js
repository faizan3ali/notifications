const mongoose = require("mongoose");

const userTypeSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, unique: true ,required: true},
});

module.exports = mongoose.model("UserType", userTypeSchema);
