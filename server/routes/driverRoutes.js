const express = require("express");
const router = express.Router();

const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver
} = require("../controllers/driverController");

// CREATE
router.post("/create", createDriver);

// READ
router.get("/all", getAllDrivers);
router.get("/:id", getDriverById);

// UPDATE
router.put("/update/:id", updateDriver);

// DELETE
router.delete("/delete/:id", deleteDriver);

module.exports = router;
