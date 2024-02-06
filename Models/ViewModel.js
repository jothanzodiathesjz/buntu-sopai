const listContent = require("./ListContent");
const mongoose = require("mongoose");
const ViewSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  text: {
    type: String,
  },
  public_id: {
    type: String,
  },
});
module.exports = mongoose.model("view", ViewSchema);
