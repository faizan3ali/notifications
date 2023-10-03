const mongoose = require("mongoose");

const applicantSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId }, // Set default value for _id field
  createdAt: { type: Date },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  source: { type: String },
  title: { type: String },
  commenthistory: [{ type: Object }],
  nameOfBirth: { type: String },
  middleName: { type: String },
  idType: { type: String },
  workDocument: { type: String },
  workDocumentValidity: { type: String },
  wageInformation: { type: String },
  monthlyWorkingHoursAllowed: { type: String },
  technicalFocalPoint: { type: mongoose.Schema.Types.ObjectId, ref: "focalPoint" },
  primaryEmail: { type: String },
  consentEmail: { type: String },
  consentStatus: { type: String },
  cgc: { type: Boolean },
  atv: { type: Boolean },
  dateOfBirth: { type: Date },
  salutation: { type: String },
  name: { type: String },
  firstName: { type: String },
  nationalities: [{ type: String }],
  idValidity: { type: Date },
  cgcValidity: { type: Date },
  atvValidity: { type: Date },
  martialStatus: { type: String },
  status: { type: String },
  statusStartDate: { type: Date },
  statusEndDate: { type: Date },
  children: [
    {
      type: Object,
    },
  ],
  travelDescription: { type: String },
  travelNationalInternational: [{ type: String }],
  willToMove: { type: Boolean },
  willToCommute: { type: Boolean },
  commuteDetails: { type: String },
  radius: { type: Number },
  communicationLanguages: [{ type: Object }],
  conditions: { type: String },
  travelAdditionalCosts: { type: String },
  availability: { type: String },
  availabilityType: { type: String },
  professionalFocus: { type: String },
  addresses: [
    {
      type: Object,
    },
  ],
  contactNumbers: [
    {
      type: Object,
    },
  ],
  emails: [
    {
      type: Object,
    },
  ],
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  homePage: { type: String },
  xing: { type: String },
  linkedIn: { type: String },
  otherSocialMedia: { type: String },
  dsvgoConsent: { type: String },
  hobbies: [{ type: String }],
  remarks: { type: String },
  visualAid: { type: Boolean },
  hearingAid: { type: Boolean },
  handicapInfo: { type: String },
  allergies: [{ type: String }],
  particularities: [{ type: String }],
  shoeSize: { type: String },
  clothesSize: { type: String },
  applicantExperiences: [{ type: Object }],
  education: [{ type: Object }],
  blacklist: { type: Boolean, default: false },
  assignedRecruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  picture: { type: Object },
  edithistory: [{ type: Object }],
  inboundDocuments: [
    {
      type: Object,
    },
  ],
  internalDocuments: [
    {
      type: Object,
    },
  ],
  outboundDocuments: [
    {
      type: Object,
    },
  ],
  otherDocuments: [
    {
      type: Object,
    },
  ],
  driversLicense: { type: Boolean },
  tools: [{ type: String }],
  furtherTraining: { type: String },
  methods: { type: String },
  comments: { type: String },
  isGlobalFavourite: { type: Boolean },
  lwId: { type: Number },
  workStatus: { type: String },
  deleteStatus:{type: String}
});
applicantSchema.index({'$**': 'text'});

module.exports = mongoose.model("applicant", applicantSchema);
