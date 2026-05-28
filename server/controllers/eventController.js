const EventRequest = require("../models/EventRequest");
const sendEventMail = require("../utils/sendEventMail");

/* ===============================
   USER: CREATE EVENT REQUEST
================================ */
const createEventRequest = async (req, res) => {
  try {
    const { name, email, mobile, address, eventType ,message} = req.body;

    if (!name || !email || !mobile || !address || !eventType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await EventRequest.create({
      name,
      email,
      mobile,
      address,
      eventType,
      message
    });

    // Notify admin
    await sendEventMail({
      to: process.env.MAIL_USER,
      subject: "📢 New Event Request Received",
      html: `
        <h3>New Event Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Event:</b> ${eventType}</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Event request submitted successfully",
      event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   ADMIN: GET ALL REQUESTS
================================ */
const getAllEvents = async (req, res) => {
  try {
    const events = await EventRequest.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   ADMIN: ACCEPT EVENT
================================ */
const acceptEvent = async (req, res) => {
  try {
    const event = await EventRequest.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "ACCEPTED";
    await event.save();

    // Send mail to user
    await sendEventMail({
      to: event.email,
      subject: "🎉 Your Event Request Is Accepted",
      html: `
        <h2>Congratulations ${event.name}!</h2>
        <p>Your event request for <b>${event.eventType}</b> has been accepted.</p>
        <p>Our team will contact you shortly.</p>
        <br/>
        <p>– Team  LOGISTICS</p>
      `
    });

    res.json({ message: "Event accepted & mail sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ===============================
   ADMIN: REJECT EVENT
================================ */
const rejectEvent = async (req, res) => {
  try {
    const { reason } = req.body;

    const event = await EventRequest.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "REJECTED";
    await event.save();

    // ✅ SEND REJECTION MAIL
    await sendEventMail({
      to: event.email,
      subject: "❌ Event Request Rejected",
      html: `
        <h2>Hello ${event.name},</h2>

        <p>Your event request for 
        <b>${event.eventType}</b> has been rejected.</p>

        <p><b>Reason:</b> ${reason || "Not specified"}</p>

        <br/>
        <p>If needed, you may submit a new request.</p>

        <p>— Team  Logistics</p>
      `
    });

    res.json({ message: "Event rejected & mail sent" });

  } catch (error) {
    console.error("Reject mail error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* ===============================
   EXPORTS
================================ */
module.exports = {
  createEventRequest,
  getAllEvents,
  acceptEvent,
  rejectEvent
};
