const mongoose = require("mongoose");

const holidaySettingsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  country: { type: String },
  state: { type: String },
  region: { type: String },
});

module.exports = mongoose.model("holidaySettings", holidaySettingsSchema);
