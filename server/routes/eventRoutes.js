const express = require("express");
const router = express.Router();

const {
  createEventRequest,
  getAllEvents,
  acceptEvent,
  rejectEvent
} = require("../controllers/eventController");
const adminAuth = require("../middleware/auth");

// USER
router.post("/create", createEventRequest);

// ADMIN
router.get("/all", getAllEvents);

router.put("/accept/:id",adminAuth, acceptEvent);
router.put("/reject/:id",adminAuth ,rejectEvent);

module.exports = router;
