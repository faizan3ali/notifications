const mongoose = require("mongoose");

const skillCategorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillCategory",
  },
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("SkillCategory", skillCategorySchema);
