const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }, // Set default value for _id field
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  companyName: { type: String, required: true },
  shortName: { type: String },
  parentCompany: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  commenthistory: [{ type: Object }],
  addresses: [{ type: Object }],
  isHeadquarter: { type: Boolean },
  belongsToCompany: { type: Boolean },
  accountsManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  acquisitionStatus: { type: Boolean },
  acquisitionStatusBlockedReason: { type: String },
  frameworkContract: { type: String },
  memoField: { type: String },
  bonusAgreement: { type: String },
  contacts: [{ type: Object }],
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
  edithistory: [{ type: Object }],
  lwId: { type: Number },
  deleteStatus:{type: String}
});

customerSchema.index({'$**': 'text'});

module.exports = mongoose.model("Customer", customerSchema);
