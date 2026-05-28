const express = require("express");
const router = express.Router();
const {
  createTransportRequest,
  getProviderRequests,
  sendTransportQuotation,
  createTransportOrder,
  verifyTransportAdvancePayment,
  getUserTransportRequests,
  userRejectTransportQuotation
 
} = require("../controllers/transportRequestController");

const transporterAuth = require("../middleware/transporterAuth");
const userAuth = require("../middleware/userAuth");

// Create request
router.post("/request", userAuth, createTransportRequest);

// Provider sees requests
router.get("/provider", transporterAuth, getProviderRequests);

// Provider sends quotation
router.post("/quote/:requestId", transporterAuth, sendTransportQuotation);

// ✅ ADD THIS (YOU ARE MISSING THIS)
router.post("/create-order", userAuth, createTransportOrder);

// ✅ ADD THIS TOO
router.post("/verify-payment", userAuth, verifyTransportAdvancePayment);

router.get("/user", userAuth, getUserTransportRequests);
router.post("/user/reject/:requestId", userAuth, userRejectTransportQuotation);
module.exports = router;
