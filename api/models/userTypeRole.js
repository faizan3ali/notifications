const mongoose = require("mongoose");

const userTypeRoleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true  },
  description: { type: String, required: true },
  category: { type: String, required: true },
  userType_id: { type: mongoose.Types.ObjectId, ref: "UserType" ,required: true},
  name:{ type: String, required: true },
  value:{ type: Boolean, required: true,default :false}
});

module.exports = mongoose.model("UserTypeRole", userTypeRoleSchema);
