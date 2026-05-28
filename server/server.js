require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const driverRoutes = require("./routes/driverRoutes");
const providerRoutes = require("./routes/providerRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const transportRequestRoutes = require("./routes/transportRequestRoutes");
const customerRoutes = require("./routes/customerRoutes");
/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/provider", providerRoutes);
app.use("/api/branch", require("./routes/branchRoutes"));
app.use("/api/pincode", require("./routes/pincodeRoutes"));
app.use("/api/shipment", require("./routes/shipmentRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/membership",require("./routes/userRoutes"))
app.use("/api/requests", require("./routes/serviceRequestRoutes"));
app.use("/api/transport", require("./routes/transportRoutes"));
app.use("/api/transport-requests", transportRequestRoutes);

app.use("/api/user", require("./routes/customerRoutes"));

app.use("/api/driver", driverRoutes);
app.use("/api/services", serviceRoutes);

/* ================== DB CONNECTION ================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ Mongo Error:", err.message);
    process.exit(1);
  });

/* ================== SERVER ================== */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
