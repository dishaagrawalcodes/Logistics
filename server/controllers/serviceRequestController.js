const ServiceRequest = require("../models/ServiceRequest");
const User = require("../models/User");
const { sendUserMail } = require("../utils/sendUserMail");
const ServiceProvider = require("../models/ServiceProvider");

// 🔍 GET requests for logged-in labour
/* ================= GET REQUESTS FOR LOGGED-IN LABOUR ================= */

exports.getLabourRequests = async (req, res) => {
  try {
    const labour = req.user;

    if (!labour.pincodes || !labour.serviceCategories) {
      return res.status(400).json({ message: "Labour profile incomplete" });
    }

    const requests = await ServiceRequest.find({
      pin: { $in: labour.pincodes || [] },
      service: { $in: labour.serviceCategories || [] },
    })
      .populate("user", "name email mobile") // only required fields
      .sort({ createdAt: -1 });

    // 🔐 Hide contact details unless confirmed
    const filteredRequests = requests.map((reqItem) => {
      const obj = reqItem.toObject();

      if (obj.status !== "confirmed" && obj.user) {
        obj.user.email = "Available after confirmation";
        obj.user.mobile = "Available after confirmation";
      }

      return obj;
    });

    res.status(200).json(filteredRequests);
  } catch (error) {
    console.error("Fetch labour requests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE SERVICE REQUEST ================= */

exports.createServiceRequest = async (req, res) => {
  try {
    const { pin, service } = req.body;

    if (!pin || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Create request using logged-in user data
    const request = await ServiceRequest.create({
      user: req.user._id,
      pin,
      service,
      status: "pending",
    });

    // 🔎 Find matching approved labours
    const labours = await ServiceProvider.find({
      pincodes: { $in: [pin] },
      serviceCategories: { $in: [service] },
      status: "approved",
    });

    // 📧 Notify labours
    for (const labour of labours) {
      await sendUserMail("NEW_SERVICE_REQUEST", {
        email: labour.email,
        userName: req.user.name,
        service: service,
        pin: pin,
      });
    }

    res.status(201).json({
      message: "Service request created successfully",
      data: request,
    });
  } catch (error) {
    console.error("Create service request error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ACCEPT REQUEST ================= */

exports.sendQuotation = async (req, res) => {
  try {
    const labour = req.user;
    const { requestId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Enter valid amount" });
    }

    const request = await ServiceRequest
  .findById(requestId)
  .populate("user");


    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "confirmed") {
      return res.status(400).json({ message: "Request already confirmed" });
    }

    if (
      !labour.pincodes.includes(request.pin) ||
      !labour.serviceCategories.includes(request.service)
    ) {
      return res.status(403).json({ message: "Not authorized for this request" });
    }

    const alreadySent = request.quotations.find(
      (q) => q.provider.toString() === labour._id.toString()
    );

    if (alreadySent) {
      return res.status(400).json({ message: "Quotation already sent" });
    }

    request.quotations.push({
      provider: labour._id,
      amount,
      status: "sent",
    });

    request.status = "quoted";

    await request.save();

    // ✅ SEND MAIL TO USER
    try {
  if (!request.user) {
    console.log("⚠️ request.user is null");
  } else {
    await sendUserMail("QUOTATION_SENT", {
      email: request.user.email,
      userName: request.user.name,
      service: request.service,
      amount,
      providerName: labour.name,
    });
  }
} catch (mailErr) {
  console.error("Quotation mail error:", mailErr);
}


    res.json({ message: "Quotation sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// STEP 1: Only create Razorpay order here
exports.createAdvanceOrder = async (req, res) => {
  try {
    const { requestId, providerId } = req.body;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "pending" && request.status !== "quoted") {
      return res.status(400).json({ message: "Request already confirmed" });
    }

    const quotation = request.quotations.find(
      (q) => q.provider.toString() === providerId && q.status === "sent"
    );

    if (!quotation) {
      return res.status(404).json({ message: "Valid quotation not found" });
    }

    const advanceAmount = Math.round(quotation.amount * 0.2 * 100);

    const Razorpay = require("razorpay");

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: advanceAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: advanceAmount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.userRejectQuotation = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { providerId } = req.body;

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const quotation = request.quotations.find(
      (q) => q.provider.toString() === providerId
    );

    if (quotation) {
      quotation.status = "rejected";
      await request.save();
    }

    res.json({ message: "Quotation rejected" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getUserRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      user: req.user._id,
    })
      .populate("quotations.provider")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    console.error("Fetch user requests error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📊 DASHBOARD STATS FOR LABOUR
exports.getLabourDashboardStats = async (req, res) => {
  try {
    const labour = req.user;

    const requests = await ServiceRequest.find({
      pin: { $in: labour.pincodes || [] },
      service: { $in: labour.serviceCategories || [] },
    });

    let quoted = 0;
    let accepted = 0;

    requests.forEach((request) => {
      request.quotations.forEach((q) => {
        if (q.provider.toString() === labour._id.toString()) {
          if (q.status === "sent") quoted++;
          if (q.status === "accepted") accepted++;
        }
      });
    });

    const stats = {
      newRequests: requests.filter((r) => r.status === "pending").length,
      quoted,
      accepted,
      total: requests.length,
    };

    res.json(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: error.message });
  }
};

const crypto = require("crypto");

exports.verifyAdvancePayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      requestId,
      providerId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const request = await ServiceRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "confirmed") {
      return res.status(400).json({ message: "Already confirmed" });
    }

    request.quotations.forEach((q) => {
      if (q.provider.toString() === providerId) {
        q.status = "accepted";
        q.advancePaid = true;
      } else {
        q.status = "rejected";
      }
    });

    request.status = "confirmed";

    await request.save();
const populatedRequest = await ServiceRequest
  .findById(requestId)
  .populate("user");

const acceptedQuotation = populatedRequest.quotations.find(
  q => q.provider.toString() === providerId
);

const provider = await ServiceProvider.findById(providerId);

try {
  // Mail to provider
  await sendUserMail("PAYMENT_RECEIVED", {
    email: provider.email,
    providerName: provider.name,
    userName: populatedRequest.user.name,
    service: populatedRequest.service,
    amount: acceptedQuotation.amount,
    advance: Math.round(acceptedQuotation.amount * 0.2)
  });
} catch (err) {
  console.error("Payment mail error:", err);
}

    res.json({ message: "Payment successful. Provider confirmed." });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

