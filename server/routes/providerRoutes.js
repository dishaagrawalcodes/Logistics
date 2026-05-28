// routes/providerRoutes.js

const express = require("express");
const router = express.Router();

// 🔒 Admin middleware
const adminAuth = require("../middleware/auth");

// 📦 Controllers — import ONCE only
const {
  registerProvider,
  reviewProvider,
  getAllProviders,
  getPendingProviders,
  updateProvider,
  deleteProvider,
  loginProvider,
  getProviderById
} = require("../controllers/serviceProviderController");
const upload = require("../middleware/upload");
const labourAuth = require("../middleware/labourAuth");


// 🌍 PUBLIC
router.post(
  "/register",
  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
  ]),
  registerProvider
);


// 🔒 ADMIN PROTECTED
router.get("/",adminAuth ,getAllProviders);
router.post("/login", loginProvider);
router.get("/pending", adminAuth, getPendingProviders);
router.patch("/review/:id", adminAuth, reviewProvider);
router.get("/:id",labourAuth ,getProviderById);

router.put("/:id",  updateProvider);
router.delete("/:id", adminAuth, deleteProvider);
// 🌍 PUBLIC login route




module.exports = router;
