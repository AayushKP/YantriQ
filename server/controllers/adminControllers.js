const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const OfferBanner = require("../models/OfferBanner"); // Import the OfferBanner model
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// -------- AUTHENTICATION CONTROLLERS --------

const adminSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken(newAdmin);
    res.status(201).json({ token, admin: newAdmin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin);
    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const adminLogout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now() + 10), // Set expiration to 0.01 seconds (10ms)
    sameSite: "strict", // Prevent CSRF attacks
  });
  res.status(200).json({ message: "Admin logged out successfully" });
};

// -------- PRODUCT CONTROLLERS --------

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 150 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); // Remove the file from the local filesystem
    return result.secure_url;
  } catch (error) {
    throw new Error("Failed to upload image.");
  }
};

// Upload multiple images and return URLs
const uploadImages = async (req, res) => {
  try {
    const urls = [];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    for (const file of req.files) {
      const imageUrl = await uploadImageToCloudinary(file.path);
      urls.push(imageUrl);
    }

    res.status(200).json({ urls });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload images" });
  }
};

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, sizes, colors, images, category } =
      req.body;

    if (
      !name ||
      !description ||
      !price ||
      !sizes ||
      !colors ||
      !images ||
      !category ||
      images.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate category
    if (
      !["oversized t-shirts", "tops", "regular t-shirts"].includes(category)
    ) {
      return res.status(400).json({ error: "Invalid category" });
    }

    // Convert sizes and colors to arrays if they are not already
    const sizesArray = Array.isArray(sizes) ? sizes : sizes.split(",");
    const colorsArray = Array.isArray(colors) ? colors : colors.split(",");

    // Create new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      sizes: sizesArray,
      colors: colorsArray,
      images,
      category,
    });

    // Save the product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: `Failed to add product: ${error.message}` });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete product: ${error.message}` });
  }
};

// -------- BANNER CONTROLLERS --------

// Add a new offer banner
const addBanner = async (req, res) => {
  try {
    const { texts, images } = req.body;

    if (!texts || !images || images.length === 0) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBanner = new OfferBanner({
      texts,
      images,
    });

    await newBanner.save();
    res
      .status(201)
      .json({ message: "Banner added successfully", banner: newBanner });
  } catch (error) {
    res.status(500).json({ error: `Failed to add banner: ${error.message}` });
  }
};

// Fetch all banners
const getBanners = async (req, res) => {
  try {
    const banners = await OfferBanner.find({});
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

// Delete a banner by ID
const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.bannerId;

    const deletedBanner = await OfferBanner.findByIdAndDelete(bannerId);

    if (!deletedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete banner: ${error.message}` });
  }
};

module.exports = {
  upload,
  uploadImages,
  addProduct,
  getProducts,
  deleteProduct,
  adminSignup,
  adminLogin,
  adminLogout,
  addBanner,
  getBanners,
  deleteBanner,
};
