const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const TransportProvider = require("../models/TransportProvider");
const { sendShipmentMail } = require("../utils/sendMail");
const TransportRequest = require("../models/TransportRequest");


const User = require("../models/User");

// ================= REGISTER =================

exports.registerTransport = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      services,
      pincode,
      vehicleName,
      vehicleNumber,
      dlNumber,
      rcNumber,
      aadhaarNumber,
      panNumber,
    } = req.body;

    if (
  !name ||
  !mobile ||
  !email ||
  !services ||
  !pincode ||
  !vehicleName ||
  !vehicleNumber ||
  !dlNumber ||
  !rcNumber
)
 {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await TransportProvider.findOne({
      $or: [{ mobile }, { email }],
    });

    if (exists) {
      return res.status(400).json({
        message: "Transport already exists",
      });
    }

    const transport = await TransportProvider.create({
      name,
      mobile,
      email,
      pincodes: [pincode],
      services: Array.isArray(services) ? services : [services],
      vehicleName,
      vehicleNumber,
      dlNumber,
      rcNumber,
      aadhaarNumber,
      panNumber,
    });

    res.status(201).json({
      message: "Transport registered successfully",
      data: transport,
    });
  } catch (err) {
    console.error("Register transport error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= REVIEW (ADMIN) ================= */

exports.reviewTransport = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, reason, password } = req.body;

    const transport = await TransportProvider.findById(id);

    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }

    // ===== APPROVE =====
    if (action === "approve") {
      if (!password) {
        return res.status(400).json({
          message: "Password required for approval",
        });
      }

      const hashed = await bcrypt.hash(password, 10);

      transport.status = "approved";
      transport.loginId = transport.mobile;
      transport.password = hashed;
      transport.rejectionReason = undefined;

      await transport.save();

      await sendShipmentMail("TRANSPORT_APPROVED", {
        ...transport.toObject(),
        plainPassword: password,
      });
    }

    // ===== REJECT =====
    else if (action === "reject") {
      if (!reason || !reason.trim()) {
        return res.status(400).json({
          message: "Rejection reason is required",
        });
      }

      transport.status = "rejected";
      transport.rejectionReason = reason;

      await transport.save();

      await sendShipmentMail("TRANSPORT_REJECTED", transport);
    } else {
      return res.status(400).json({
        message: "Action must be approve or reject",
      });
    }

    res.json({
      message: `Transport ${action}d successfully`,
      data: transport,
    });
  } catch (err) {
    console.error("Review transport error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL ================= */

exports.getAllTransports = async (req, res) => {
  const list = await TransportProvider.find();
  res.json(list);
};

/* ================= GET PENDING ================= */

exports.getPendingTransports = async (req, res) => {
  const list = await TransportProvider.find({ status: "pending" });
  res.json(list);
};

/* ================= GET BY ID ================= */

exports.getTransportById = async (req, res) => {
  try {
    const data = await TransportProvider.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

/* ================= UPDATE ================= */

exports.updateTransport = async (req, res) => {
  try {
    const transport = await TransportProvider.findById(req.params.id);

    if (!transport) {
      return res.status(404).json({ message: "Not found" });
    }

    const {
      name,
      mobile,
      email,
      vehicleName,
      vehicleNumber,
      dlNumber,
      rcNumber,
      pincodes,
      services 
    } = req.body;
if (services) {
  transport.services = Array.isArray(services)
    ? services
    : [services];
}

    if (name) transport.name = name;
    if (mobile) transport.mobile = mobile;
    if (email) transport.email = email;
    if (vehicleName) transport.vehicleName = vehicleName;
    if (vehicleNumber) transport.vehicleNumber = vehicleNumber;
    if (dlNumber) transport.dlNumber = dlNumber;
    if (rcNumber) transport.rcNumber = rcNumber;

    // append pincodes
    if (pincodes) {
      const pins = Array.isArray(pincodes) ? pincodes : [pincodes];

      pins.forEach((pin) => {
        if (!transport.pincodes.includes(pin)) {
          transport.pincodes.push(pin);
        }
      });
    }

    await transport.save();

    res.json({
      message: "Updated successfully",
      data: transport,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE ================= */

exports.deleteTransport = async (req, res) => {
  await TransportProvider.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

/* ================= LOGIN ================= */

exports.loginTransport = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({
        message: "Login ID and password required",
      });
    }

    const transport = await TransportProvider.findOne({ loginId });

    if (!transport || transport.status !== "approved") {
      return res.status(401).json({
        message: "Invalid credentials or not approved",
      });
    }

    const match = await bcrypt.compare(password, transport.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { _id: transport._id, role: "transport" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      data: {
        transport: {
  _id: transport._id,
  name: transport.name,
  email: transport.email,
  mobile: transport.mobile,
  vehicleNumber: transport.vehicleNumber,
  vehicleName: transport.vehicleName,
  dlNumber: transport.dlNumber,
  rcNumber: transport.rcNumber,
  services: transport.services,
  pincodes: transport.pincodes,
  status: transport.status,
  createdAt: transport.createdAt,
},

        token,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getTransportProfile = async (req, res) => {
  const transport = await TransportProvider.findById(req.transport._id);
  res.json(transport);
};

exports.getTransportStats = async (req, res) => {
  try {
    const transportId = req.transport._id;

    const transport = await TransportProvider.findById(transportId);

    if (!transport) {
      return res.status(404).json({ message: "Transport not found" });
    }

    const totalShipments = await TransportRequest.countDocuments({
      transport: transportId,
    });

    const monthlyShipments = await TransportRequest.find({
      transport: transportId,
      createdAt: {
        $gte: new Date(new Date().setDate(1)),
      },
    });

    const monthlyRevenue = monthlyShipments.reduce(
      (sum, s) => sum + (s.amount || 0),
      0
    );

    const totalCustomers = await User.countDocuments({
      role: "user",
    });

    res.json({
      transportDetails: {
        name: transport.name,
        status: transport.status,
        createdAt: transport.createdAt,
      },
      totalShipments,
      totalCustomers,
      monthlyRevenue,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET TRANSPORT REQUESTS FOR USER ================= */


