const listContent = require("./ListContent");
const mongoose = require("mongoose");
const LandingPageSchema = new mongoose.Schema({
  BannerLanding: {
    type: String,
  },
  DescriptionLanding: {
    type: String,
  },
  ContentLanding: [listContent],
});
module.exports = mongoose.model("landingPage", LandingPageSchema);
