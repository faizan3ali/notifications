const mongoose = require("mongoose");

const designationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
  name: { type: String, unique: true },
});

module.exports = mongoose.model("Designation", designationSchema);
