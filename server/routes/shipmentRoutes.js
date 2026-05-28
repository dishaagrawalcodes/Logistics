const express = require("express");
const router = express.Router();

const {
  createShipmentRequest,
  getAllShipments,
  acceptShipment,
  rejectShipment,
  startShipment,
  updateDriverTracking,
  deliverShipment
} = require("../controllers/shipmentController");

// USER
router.post("/create", createShipmentRequest);

// ADMIN
router.get("/all", getAllShipments);

router.put("/accept/:id", acceptShipment);
router.put("/reject/:id", rejectShipment);
router.put("/start/:id", startShipment);
router.put("/progress/:id", updateDriverTracking);
router.put("/deliver/:id", deliverShipment);

module.exports = router;
