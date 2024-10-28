const express = require("express");
const {
  register,
  login,
  getProducts,
  getBannersAndOffers,
  getProductById,
  getSimilarProducts,
  getUser,
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

//user routes
router.post("/register", register);
router.post("/login", login);

//product routes
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/bannersnoffers", getBannersAndOffers);
router.get("/products/similar", getSimilarProducts);

//user
router.get("/getUser", authenticateUser, getUser);

module.exports = router;
