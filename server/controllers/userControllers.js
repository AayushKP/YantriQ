const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const OfferBanner = require("../models/OfferBanner");
require("dotenv").config();

// User Registration
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const name = email.split("@")[0]; // Extract name as letters before "@" in email

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // Conflict status
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a token with 7 days expiration
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { id: newUser._id, name, email } }); // Return user details and token
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Not Found status
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" }); // Unauthorized status
    }

    // Generate a token with 7 days expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    }); // Return user details and token
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).json({ message: error.message });
  }
};

// Fetch User Details
exports.getUser = async (req, res) => {
  try {
    // Find the user by ID from the JWT token and populate necessary fields
    const user = await User.findById(req.user.id)
      .populate("address")
      .populate("orders") // Populate orders
      .populate("cart"); // Populate cart

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Not Found status
    }

    res.status(200).json(user); // Return user details
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error. Please try again later." }); // Internal Server Error
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add Address
exports.addAddress = async (req, res) => {
  const { street, city, zip_code } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { address: { street, city, zip_code } } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});

    // Return the products as JSON
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Remove Address
exports.removeAddress = async (req, res) => {
  const { addressId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { address: { _id: addressId } } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({ user_id: req.user.id }).populate(
      "products.product_id"
    );
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add to Cart
exports.addToCart = async (req, res) => {
  const { product_id, quantity, size, color, price } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { user_id: req.user.id },
      { $push: { products: { product_id, quantity, size, color, price } } },
      { new: true, upsert: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id }).populate(
      "products.product_id"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Checkout
exports.checkout = async (req, res) => {
  const { shipping_address } = req.body;
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });
    const newOrder = await Order.create({
      user_id: req.user.id,
      products: cart.products,
      total_amount: cart.total_price,
      shipping_address,
    });
    await Cart.findOneAndUpdate(
      { user_id: req.user.id },
      { products: [], total_price: 0 }
    );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch Product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to fetch similar products by category
exports.getSimilarProducts = async (req, res) => {
  try {
    const { category, excludeId } = req.query;

    // Check if category and excludeId are provided
    if (!category || !excludeId) {
      return res
        .status(400)
        .json({ message: "Category and excludeId are required." });
    }

    // Fetch products in the same category and exclude the clicked product
    const similarProducts = await Product.find({
      category,
      _id: { $ne: excludeId }, // Exclude the current product
    });

    res.status(200).json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Fetch Banners and Offers
exports.getBannersAndOffers = async (req, res) => {
  try {
    const offerBanner = await OfferBanner.findOne({});

    if (!offerBanner) {
      return res.status(404).json({ message: "No banners or offers found" });
    }

    const { texts, images } = offerBanner;
    res.status(200).json({ texts, images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
