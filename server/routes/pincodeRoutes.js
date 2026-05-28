const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/auth");
const {
  addPincode,
  getPincodesByBranch,
  checkServiceByPincode
} = require("../controllers/pincodeController");

// admin
router.post("/add", adminAuth, addPincode);
router.get("/branch/:branchId", adminAuth, getPincodesByBranch);

// user
router.get("/check/:pincode", checkServiceByPincode);

module.exports = router;
