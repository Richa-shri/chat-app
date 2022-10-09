const mongoose = require("mongoose");
const MsgSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: String,
  time: String,
  message: String,
});

module.exports = mongoose.model("messages", MsgSchema);