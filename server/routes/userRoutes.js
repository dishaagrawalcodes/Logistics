const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");

// 🌍 PUBLIC
router.post("/user", registerUser);

module.exports = router;
