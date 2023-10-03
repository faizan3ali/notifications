const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: String },
  updatedBy: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  resetToken: { type: String, required: false },
  country: { type: String },
  city: { type: String },
  password: { type: String},
  designation: [{ type: mongoose.Schema.Types.ObjectId, ref: "Designation" }],
  mobileNumber: { },
  phoneNumber: {  },
  faxNumber: {  type: Object },
  userType: { type: mongoose.Schema.Types.ObjectId, ref: "UserType" },
  favouriteApplicants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "applicant" },
  ],
  favouriteProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  favouriteCustomers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  ],
  accountStatus: { type: String, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teams" }],
  notifications: [{ type: Object }],
  deleteStatus:{type: String},
  favouriteCustomerContacts: [{ type: Object }],
  token: { type: String }
});

module.exports = mongoose.model("User", userSchema);
