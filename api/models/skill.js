const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
  name: { type: String, unique: true },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillCategory",
  },
  childCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SkillCategory" },
});

module.exports = mongoose.model("Skill", skillSchema);
