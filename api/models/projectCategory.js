const mongoose = require("mongoose");

const projectCategorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, unique: true },
});

module.exports = mongoose.model("projectCategory", projectCategorySchema);
