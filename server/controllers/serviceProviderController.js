// controllers/serviceProviderController.js
const jwt = require("jsonwebtoken");
const ServiceProvider = require("../models/ServiceProvider");
const { sendShipmentMail } = require("../utils/sendMail");
const bcrypt = require("bcryptjs");

exports.registerProvider = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      pincode,
      mobile,
      serviceCategory,
    } = req.body;
    console.log("BODY:", req.body);
console.log("FILES:", req.files);


    if (!name || !email || !address || !pincode || !mobile || !serviceCategory) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await ServiceProvider.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Provider already exists" });
    }

    // 📌 Aadhaar images
    const aadhaarData = {};
    if (req.files?.aadhaarFront) {
      aadhaarData.frontImage = req.files.aadhaarFront[0].path;
    }
    if (req.files?.aadhaarBack) {
      aadhaarData.backImage = req.files.aadhaarBack[0].path;
    }

   const provider = await ServiceProvider.create({
  name,
  email,
  address,
  mobile,
  pincodes: [pincode],
  serviceCategories: [serviceCategory],
  aadhaar: Object.keys(aadhaarData).length ? aadhaarData : undefined,
});


    res.status(201).json({
      message: "Application submitted successfully",
      data: provider,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reviewProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, reason, password } = req.body;

    const provider = await ServiceProvider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // ================= APPROVE =================
    if (action === "approve") {

      // ✅ require password from admin modal
      if (!password) {
        return res.status(400).json({
          message: "Admin-created password is required for approval"
        });
      }

      // ✅ hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ set login credentials
      provider.status = "approved";
      provider.loginId = provider.mobile; // auto login id
      provider.password = hashedPassword;
      provider.rejectionReason = undefined;

      await provider.save();

      // ✅ send credentials mail
      await sendShipmentMail("PROVIDER_APPROVED", {
        ...provider.toObject(),
        plainPassword: password // only for mail
      });
    }

    // ================= REJECT =================
    else if (action === "reject") {
      provider.status = "rejected";
      provider.rejectionReason = reason || "Not specified";

      await provider.save();

      await sendShipmentMail("PROVIDER_REJECTED", provider);
    }

    else {
      return res.status(400).json({
        message: "Action must be approve or reject"
      });
    }

    res.json({
      message: `Provider ${action}d successfully`,
      data: provider
    });

  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAllProviders = async (req, res) => {
  const providers = await ServiceProvider.find();
  res.json(providers);
};

exports.getPendingProviders = async (req, res) => {
  const providers = await ServiceProvider.find({ status: "pending" });
  res.json(providers);
};
exports.updateProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      address,
      mobile,
      pincodes,
      serviceCategories
    } = req.body;

    const provider = await ServiceProvider.findById(id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // ================= OVERWRITE FIELDS =================
    // These should always update (replace old value)

    if (name) provider.name = name;
    if (email) provider.email = email;
    if (address) provider.address = address;
    if (mobile) provider.mobile = mobile;

    // ================= APPEND PINCODES =================
    // Must keep old + add new (no duplicates)

    if (pincodes) {
      const newPins = Array.isArray(pincodes) ? pincodes : [pincodes];

      newPins.forEach((pin) => {
        if (!provider.pincodes.includes(pin)) {
          provider.pincodes.push(pin);
        }
      });
    }

    // ================= APPEND SERVICES =================
    // Keep existing services + add new ones

    if (serviceCategories) {
      const newServices = Array.isArray(serviceCategories)
        ? serviceCategories
        : [serviceCategories];

      newServices.forEach((service) => {
        if (!provider.serviceCategories.includes(service)) {
          provider.serviceCategories.push(service);
        }
      });
    }

    await provider.save();

    res.json({
      message: "Provider updated successfully",
      data: provider
    });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};



// DELETE PROVIDER

exports.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ServiceProvider.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({
      message: "Provider deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ================= LOGIN PROVIDER =================
exports.loginProvider = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({ message: "Login ID and password are required" });
    }

    const provider = await ServiceProvider.findOne({ loginId });

    if (!provider || provider.status !== "approved") {
      return res.status(401).json({ message: "Invalid credentials or provider not approved" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
  { _id: provider._id, role: "provider" },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.json({
      message: "Login successful",
      data: {
        provider: {
          _id: provider._id,
          name: provider.name,
          email: provider.email,
          mobile: provider.mobile,
          serviceCategories: provider.serviceCategories,
          pincodes: provider.pincodes,

        },
        token,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
