
const ShipmentRequest = require("../models/ShipmentRequest");
const Driver = require("../models/Driver");

const { 
 sendShipmentMail,
 sendCustomerMail,
 sendDriverMail 
} = require("../utils/sendMail");


// ---------------- CREATE ----------------

exports.createShipmentRequest = async (req, res) => {

  try {

    const {
      name,
      mobile,
      email,
      pickupAddress,
      deliveryAddress,
      itemDescription
    } = req.body;

    if (!name || !mobile || !email || !pickupAddress || !deliveryAddress || !itemDescription) {
      return res.status(400).json({ message: "All fields required" });
    }

    const shipment = await ShipmentRequest.create({
      name,
      mobile,
      email,
      pickupAddress,
      deliveryAddress,
      itemDescription
    });

    // Admin mail
    try {
      await sendShipmentMail("ADMIN", shipment);
    } catch (err) {
      console.log("Mail failed:", err.message);
    }

    res.status(201).json({
      message: "Shipment created",
      data: shipment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ---------------- GET ALL ----------------

exports.getAllShipments = async (req, res) => {

  const shipments = await ShipmentRequest.find().sort({ createdAt: -1 });

  res.json(shipments);
};


// ---------------- ACCEPT ----------------

exports.acceptShipment = async (req, res) => {
 try {

  const {
   shipmentNo,
   advancePayment,
   remainingPayment,
   assignMode,
   manualDriver
  } = req.body;

  if (!shipmentNo || !advancePayment || !remainingPayment) {
   return res.status(400).json({
    message: "Shipment number and payments required"
   });
  }

  const shipment = await ShipmentRequest.findById(req.params.id);

  if (!shipment) {
   return res.status(404).json({ message: "Shipment not found" });
  }

  // duplicate check excluding self
  const exists = await ShipmentRequest.findOne({
   shipmentNo,
   _id: { $ne: req.params.id }
  });

  if (exists) {
   return res.status(400).json({
    message: "Shipment number already used"
   });
  }

  // ---------- AUTO ----------
  if (assignMode === "AUTO") {

   const driver = await Driver.findOneAndUpdate(
    { status: "AVAILABLE" },
    { status: "BUSY" },
    { new: true }
   );

   if (!driver) {
    return res.status(400).json({
     message: "No driver available"
    });
   }

   shipment.driver = {
    name: driver.name,
    phone: driver.phone,
    email: driver.email,
    vehicleNo: driver.vehicleNo
   };
  }

  // ---------- MANUAL ----------
  if (assignMode === "MANUAL") {

   if (!manualDriver?.name || !manualDriver?.phone || !manualDriver?.email) {
    return res.status(400).json({
     message: "Driver info required"
    });
   }

   shipment.driver = manualDriver;
  }

  shipment.status = "ACCEPTED";
  shipment.shipmentNo = shipmentNo;
  shipment.advancePayment = Number(advancePayment);
  shipment.remainingPayment = Number(remainingPayment);
  shipment.acceptedAt = new Date();

  await shipment.save();

  await sendShipmentMail("ACCEPTED", shipment);

  if (shipment.driver?.email) {
   await sendShipmentMail("DRIVER", shipment);
  }

  res.json({ message: "Shipment accepted successfully" });

 } catch (err) {

  if (err.code === 11000) {
   return res.status(400).json({
    message: "Shipment number already exists"
   });
  }

  console.log(err);
  res.status(500).json({ error: err.message });
 }
};



// ---------------- REJECT ----------------

exports.rejectShipment = async (req, res) => {

  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: "Reason required" });
  }

  const shipment = await ShipmentRequest.findById(req.params.id);

  if (!shipment) {
    return res.status(404).json({ message: "Shipment not found" });
  }

  shipment.status = "REJECTED";
  shipment.rejectionReason = reason;

  await shipment.save();

  await sendShipmentMail("REJECTED", shipment);

  res.json({ message: "Shipment rejected" });
};


// ---------------- START ----------------

exports.startShipment = async (req, res) => {

  const shipment = await ShipmentRequest.findById(req.params.id);

  if (!shipment || shipment.status !== "ACCEPTED") {
    return res.status(400).json({ message: "Accept shipment first" });
  }

  shipment.status = "STARTED";
  shipment.startedAt = new Date();

  // FIRST ROUTE ENTRY (WAREHOUSE)
  shipment.locationHistory.push({
    place: "Warehouse",
    time: new Date()
  });

  await shipment.save();

  res.json({ message: "Shipment started" });
};


// ---------------- TRACK (ROUTE UPDATE) ----------------

exports.updateDriverTracking = async (req, res) => {

  const { currentLocation } = req.body;

  if (!currentLocation) {
    return res.status(400).json({ message: "Location required" });
  }

  const shipment = await ShipmentRequest.findById(req.params.id);

  if (
    shipment.status !== "STARTED" &&
    shipment.status !== "IN_PROGRESS"
  ) {
    return res.status(400).json({ message: "Shipment not started" });
  }

  shipment.status = "IN_PROGRESS";
  shipment.currentLocation = currentLocation;

  // ADD TO ROUTE HISTORY
  shipment.locationHistory.push({
    place: currentLocation,
    time: new Date()
  });

  shipment.lastUpdated = new Date();

  await shipment.save();

  res.json({ message: "Location updated" });
};


// ---------------- DELIVER ----------------

exports.deliverShipment = async (req, res) => {

  const shipment = await ShipmentRequest.findById(req.params.id);

  if (!shipment || shipment.status !== "IN_PROGRESS") {
    return res.status(400).json({ message: "Shipment not in progress" });
  }

  shipment.status = "DELIVERED";
  shipment.deliveredAt = new Date();

  // FINAL LOCATION ENTRY
  shipment.locationHistory.push({
    place: "Delivered",
    time: new Date()
  });

  await shipment.save();

  await sendShipmentMail("DELIVERED", shipment);
  await Driver.updateOne(
 { email: shipment.driver.email },
 { status: "AVAILABLE" }
);

  res.json({ message: "Delivered successfully" });
};
