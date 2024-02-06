const mongoose = require("mongoose");
const ListContentSchema = new mongoose.Schema({
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

module.exports = ListContentSchema;
