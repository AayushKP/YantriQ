const mongoose = require("mongoose");

const offerBannerSchema = new mongoose.Schema(
  {
    texts: [{ type: String, required: true }], // Offer texts
    images: [{ type: String, required: true }], // Array of banner image URLs
  },
  { collection: "offersAndBanners" }
);

const OfferBanner = mongoose.model("OfferBanner", offerBannerSchema);
module.exports = OfferBanner;
