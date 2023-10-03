const mongoose = require("mongoose");

const employeeProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "applicant" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  password: { type: String },
  hashPassword: { type: String },
  username: { type: String },
  document: [{ type: Object }],
  timeSheet: [{ type: mongoose.Schema.Types.ObjectId, ref: "timesheet" }],
  vacationRequest:[{ type: mongoose.Schema.Types.ObjectId, ref: "vacationRequest" }],
  resetToken: { type: String, required: false },
});

module.exports = mongoose.model("employeeprofile", employeeProfileSchema);
