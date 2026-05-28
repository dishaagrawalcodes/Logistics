const express = require("express");
const router = express.Router();
const {
  getLabourRequests,
  sendQuotation,
  userRejectQuotation,
  getLabourDashboardStats,
  createServiceRequest,
  getUserRequests,
  createAdvanceOrder,
  verifyAdvancePayment
} = require("../controllers/serviceRequestController");


const labourAuth = require("../middleware/labourAuth");
const userAuth = require("../middleware/userAuth");


router.post("/request", userAuth, createServiceRequest);
router.get("/labour", labourAuth, getLabourRequests);

router.get("/dashboard-stats", labourAuth, getLabourDashboardStats);
router.post("/quote/:requestId", labourAuth, sendQuotation);
router.get("/my-requests", userAuth, getUserRequests);

router.post("/create-order", userAuth, createAdvanceOrder);
router.post("/verify-payment", userAuth, verifyAdvancePayment);


router.post("/user-reject/:requestId", userAuth, userRejectQuotation);

module.exports = router;
