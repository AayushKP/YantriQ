const express = require("express");
const {
  upload, // Multer middleware for image uploads
  uploadImages,
  addProduct,
  getProducts,
  deleteProduct,
  addBanner,
  getBanners,
  deleteBanner,
} = require("../controllers/adminControllers");

const router = express.Router();

// -------- PRODUCT ROUTES --------
router.post("/product", addProduct); // Add Product
router.get("/product", getProducts); // Fetch all products
router.delete("/product/:productId", deleteProduct);
router.post("/banner", addBanner); // Add a new offer banner
router.get("/banner", getBanners); // Fetch all banners
router.delete("/banner/:bannerId", deleteBanner); // Delete a banner by ID

// -------- IMAGE UPLOAD ROUTES --------
router.post("/upload", upload.array("images"), uploadImages); // Upload product images

module.exports = router;
