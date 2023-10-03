const mongoose = require("mongoose");

const vacationRequestSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String },
  submitted: { type: Boolean },
  comments: { type: String },
  employeeProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employeeprofile",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId},
  feedback: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId},
  feedback: { type: String },
});

module.exports = mongoose.model("vacationRequest", vacationRequestSchema);
