const express = require("express");
const router = express.Router();

// 🔒 Middlewares 
const adminAuth = require("../middleware/auth");



// 📦 Controller
const {
  registerTransport,
  reviewTransport,
  getAllTransports,
  getPendingTransports,
  updateTransport,
  deleteTransport,
  loginTransport,
  getTransportById,
  getTransportStats,
  

} = require("../controllers/transportController");
const transporterAuth = require("../middleware/transporterAuth");


// ================= 🌍 PUBLIC =================

// register transport
router.post("/register", registerTransport);

// ================= 🔒 ADMIN PROTECTED =================

// get all
router.get("/", adminAuth, getAllTransports);
router.post("/login", loginTransport);
// get pending
router.get("/pending", adminAuth, getPendingTransports);

// 📊 Stats Route (Transport Protected)



// approve / reject
router.patch("/review/:id", adminAuth, reviewTransport);

// delete
router.delete("/:id", adminAuth, deleteTransport);

// ================= 👤 ROLE PROTECTED =================

router.get("/stats", transporterAuth, getTransportStats);

router.get("/:id",transporterAuth, getTransportById);

router.put("/:id",transporterAuth ,updateTransport);



module.exports = router;
