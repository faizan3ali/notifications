const mongoose = require("mongoose");

const timesheetSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lwId: { type: Number },
  month: { type: String },
  year: { type: String },
  status: { type: String },
  entries: [{ type: Object }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  employeeProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employeeprofile",
  },
  frequency:{ type: String },
  invoiceNumber: { type: String },
  acknowledgeStatus: { type: String, default: "-" },
  acknowledgedBy: { type: String },
  acknowledgedUserData:{type:Object},
  acknowledgedAt: { type: Date },
  CustomerComments:{ type: String },
  mangerComments:[{
    type: Object,
  }],
  internalComments:{ type: String },
  comments:{type:String},
  timeSheetDocuments: [
    {
      type: Object,
    },
  ],
});

module.exports = mongoose.model("timesheet", timesheetSchema);
