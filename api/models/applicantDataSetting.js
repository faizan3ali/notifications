const mongoose = require("mongoose");

const applicantDataSettingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  source: { type: Boolean, required: true },
  title: { type: Boolean, required: true },
  nameOfBirth: { type: Boolean, required: true },
  middleName: { type: Boolean, required: true },
  name: { type: Boolean, required: true },
  firstName: { type: Boolean, required: true },
  idType: { type: Boolean, required: true },
  idValidity: { type: Boolean, required: true },
  workDocument: { type: Boolean, required: true },
  workDocumentValidity: { type: Boolean, required: true },
  cgc: { type: Boolean, required: true },
  atv: { type: Boolean, required: true },
  dateOfBirth: { type: Boolean, required: true },
  salutation: { type: Boolean, required: true },
  cgcValidity: { type: Boolean, required: false },
  atvValidity: { type: Boolean, required: false },
  martialStatus: { type: Boolean, required: true },
  status: { type: Boolean, required: true },
  children: { type: Boolean, required: true },
});

module.exports = mongoose.model(
  "ApplicantDataSetting",
  applicantDataSettingSchema
);
