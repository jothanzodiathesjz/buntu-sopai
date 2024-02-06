const mongoose = require("mongoose");
const listContent = require("./ListContent");
const FacilitiesSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  title: {
    type: String
  }
  ,
  text: {
    type: String,
  },
  public_id: {
    type: String,
  },
});
module.exports = mongoose.model("facilities", FacilitiesSchema);
