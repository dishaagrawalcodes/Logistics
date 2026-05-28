const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/auth");

const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServicesByType,
  createServicesByType
} = require("../controllers/serviceController");

/* PUBLIC — list services */
router.get("/", getAllServices);
router.get("/type/:type", getServicesByType);

/* ADMIN */
router.post("/", adminAuth, createService);
router.post("/create-by-type", adminAuth, createServicesByType);
router.put("/:id", adminAuth, updateService);
router.delete("/:id", adminAuth, deleteService);

module.exports = router;
