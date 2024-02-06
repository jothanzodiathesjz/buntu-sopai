const mongoose = require("mongoose");
const TicketPriceSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  price: {
    type: Number,
  },
});
module.exports = mongoose.model("ticketPrice", TicketPriceSchema);
