const TransportRequest = require("../models/TransportRequest");
const TransportProvider = require("../models/TransportProvider");
const { sendTransporterMail } = require("../utils/sendTransporterMail");
const { sendUserMail } = require("../utils/sendUserMail");

const Razorpay = require("razorpay");
const crypto = require("crypto");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
exports.createTransportRequest = async (req, res) => {
  try {
    const { pickupAddress, deliveryAddress, pincode, service } = req.body;

    if (!pickupAddress || !deliveryAddress || !pincode || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ STEP 1: Create request FIRST
    const request = await TransportRequest.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.mobile,
      pickupAddress,
      deliveryAddress,
      pincode,
      service,
      status: "pending",
    });

    // ✅ STEP 2: Find matching providers
    const providers = await TransportProvider.find({
      pincodes: pincode,
      status: "approved",
      services: service.trim(),
    });

    // ✅ STEP 3: Send mail to all matching providers
    for (const provider of providers) {
      try {
        await sendTransporterMail("NEW_TRANSPORT_REQUEST", {
          email: provider.email,
          providerName: provider.name,
          userName: req.user.name,
          service: request.service,
          pickup: request.pickupAddress,
          delivery: request.deliveryAddress,
        });
      } catch (err) {
        console.error("Mail error:", err.message);
      }
    }

    res.status(201).json({
      message: "Transport request created successfully",
      data: request,
    });

  } catch (err) {
    console.error("Create transport request error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/* ================= GET REQUESTS FOR LOGGED IN PROVIDER ================= */

exports.getProviderRequests = async (req, res) => {
  try {
    const provider = req.transport;

    const requests = await TransportRequest.find({
      pincode: { $in: provider.pincodes },
      service: { $in: provider.services },
    }).sort({ createdAt: -1 });

    // 🔥 Hide contact details unless confirmed
    const filteredRequests = requests.map((reqItem) => {
      const obj = reqItem.toObject();

      if (obj.status !== "confirmed") {
        delete obj.phone;
        delete obj.email;
      }

      return obj;
    });

    res.json(filteredRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= ACCEPT REQUEST ================= */
exports.sendTransportQuotation = async (req, res) => {
  try {
    const provider = req.transport;
    const { requestId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Enter valid amount" });
    }

    const request = await TransportRequest
      .findById(requestId)
      .populate("user");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const alreadySent = request.quotations.find(
      q => q.provider.toString() === provider._id.toString()
    );

    if (alreadySent) {
      return res.status(400).json({ message: "Quotation already sent" });
    }

    request.quotations.push({
      provider: provider._id,
      amount,
      status: "sent",
      advancePaid: false,
    });

    request.status = "quoted";
    await request.save();

    // 📧 Send mail to user
    try {
      await sendUserMail("TRANSPORT_QUOTATION_RECEIVED", {
        email: request.user.email,
        userName: request.user.name,
        providerName: provider.name,
        amount,
        pickup: request.pickupAddress,
        delivery: request.deliveryAddress,
      });
    } catch (err) {
      console.error("Mail error:", err.message);
    }

    res.json({ message: "Quotation sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.createTransportOrder = async (req, res) => {
  try {
    const { requestId, providerId } = req.body;

    const request = await TransportRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const quotation = request.quotations.find(
      (q) => q.provider.toString() === providerId,
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // 20% advance
    const advanceAmount = Math.round(quotation.amount * 0.2);

    const options = {
      amount: advanceAmount * 100, // paise
      currency: "INR",
      receipt: `receipt_${requestId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.verifyTransportAdvancePayment = async (req, res) => {
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

    const request = await TransportRequest
      .findById(requestId)
      .populate("user");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const selectedQuotation = request.quotations.find(
      q => q.provider.toString() === providerId
    );

    if (!selectedQuotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    // Update quotation statuses
    request.quotations.forEach(q => {
      if (q.provider.toString() === providerId) {
        q.status = "accepted";
        q.advancePaid = true;
      } else {
        q.status = "rejected";
      }
    });

    request.status = "confirmed";
    await request.save();

    // Get provider details
    const provider = await TransportProvider.findById(providerId);

    // 📧 Send mail to provider
    try {
      await sendTransporterMail("TRANSPORT_PAYMENT_RECEIVED", {
        email: provider.email,
        providerName: provider.name,
        userName: request.user.name,
        service: request.service,
        totalAmount: selectedQuotation.amount,
        advance: Math.round(selectedQuotation.amount * 0.2),
        pickup: request.pickupAddress,
        delivery: request.deliveryAddress,
      });
    } catch (err) {
      console.error("Mail error:", err.message);
    }

    res.json({ message: "Transport confirmed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.getUserTransportRequests = async (req, res) => {
  try {
    const requests = await TransportRequest.find({
      user: req.user._id,
    })
      .populate("quotations.provider", "name mobile email vehicleName")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("Get user transport requests error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.userRejectTransportQuotation = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { providerId } = req.body;

    const request = await TransportRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const quotation = request.quotations.find(
      q => q.provider.toString() === providerId
    );

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    quotation.status = "rejected";

    await request.save();

    res.json({ message: "Quotation rejected successfully" });

  } catch (error) {
    console.error("Reject transport quotation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
