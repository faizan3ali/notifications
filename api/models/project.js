const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }, // Set default value for _id field
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  mainCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  subCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  contacts: [{ type: Object }],
  address: { type: String },
  startDate: { type: Date, default: "" },
  durationComment: { type: String },
  endDate: { type: Date, default: "" },
  status: { type: String },
  priority: { type: String },
  category: { type: String },
  applicants: [{ type: Object }],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  comments: { type: String },
  accountsManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recruiters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  documents: [
    {
      type: Object,
    },
  ],
  otherDocuments: [
    {
      type: Object,
    },
  ],
  history: [{ type: Object }],
  createdBy: { type: String },
  createdAt: { type: Date },
  updatedBy: { type: String },
  updatedAt: { type: Date },
  conditions: [{ type: String }],
  lwId: { type: Number },
  rateType: { type: String },
  rateValue: { type: String },
  variableType: { type: String },
  variableDetail: { type: String },
  modeOfWork: { type: String },
  shift: { type: String },
  morningShiftStartTime: { type: Date },
  morningShiftEndTime: { type: Date },
  nightShiftStartTime: { type: Date },
  nightShiftEndTime: { type: Date },
  country: { type: String },
  state: { type: String },
  region: { type: String },
  deleteStatus:{type: String}
});
projectSchema.index({'$**': 'text'});
module.exports = mongoose.model("Project", projectSchema);
