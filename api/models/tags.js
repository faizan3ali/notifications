const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
});

module.exports = mongoose.model("Tags", userSchema);
