const User = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider");
const ServiceRequest = require("../models/ServiceRequest");
const { sendUserMail } = require("../utils/sendUserMail");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, pin, address, service } = req.body;

    if (!name || !email || !phone || !pin || !address || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 1️⃣ Create user
    const user = await User.create({
      name,
      email,
      phone,
      pin,
      address,
      service,
    });

    // 2️⃣ Create service request
    const serviceRequest = await ServiceRequest.create({
      user: user._id,
      pin,
      service,
    });

    // 3️⃣ Find matching labours
    const labours = await ServiceProvider.find({
  pincodes: pin, // match pin inside pincodes array
  serviceCategories: service, // match service inside serviceCategories array
  status: "approved",
});


    // 4️⃣ Send mail to labours (UNCHANGED)
    for (const labour of labours) {
      await sendUserMail("USER_SERVICE_REQUEST", {
        providerName: labour.name,
        providerEmail: labour.email,
        userName: user.name,
        userPhone: user.phone,
        address: user.address,
        service,
        pin,
      });
    }

    res.status(201).json({
      message: "Service request created",
      requestId: serviceRequest._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
