const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/auth");
const { addBranch, getBranches } = require("../controllers/branchController");

router.post("/add", adminAuth, addBranch);
router.get("/list", adminAuth, getBranches);

module.exports = router;
