const router = require("express").Router();
const userAuth = require("../middleware/userAuth");

const {
  registerUser,
  loginWithMobile,
  updateProfile,
  getProfile
} = require("../controllers/customerController");


// Routes
router.post("/register", registerUser);
router.post("/login", loginWithMobile);
router.put("/update", userAuth, updateProfile);
router.get("/me", userAuth, getProfile);
module.exports = router;
