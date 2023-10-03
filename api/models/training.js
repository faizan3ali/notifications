const mongoose = require("mongoose");

const trainingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
  name: { type: String, unique: true },
 
});

module.exports = mongoose.model("training", trainingSchema);