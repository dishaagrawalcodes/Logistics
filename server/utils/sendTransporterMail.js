const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendTransporterMail = async (type, data) => {
  console.log("Sending mail to:", data.email);

  try {
    let subject = "";
    let html = "";

    if (type === "REQUEST_CREATED") {
      subject = "New Transport Booking Received 🚚";

      html = `
        <h3>New Transport Request</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Pickup:</strong> ${data.pickupAddress}</p>
        <p><strong>Delivery:</strong> ${data.deliveryAddress}</p>
      `;
    }

    if (type === "REQUEST_ASSIGNED") {
      subject = "Your Transport Request Has Been Accepted 🚛";

      html = `
        <h3>Your Transport Request Has Been Accepted</h3>
        <p><strong>Name:</strong> ${data.userName}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Amount:</strong> ₹${data.amount}</p>
        <hr/>
        <h4>Transport Provider Details</h4>
        <p><strong>Driver:</strong> ${data.transport?.name}</p>
        <p><strong>Phone:</strong> ${data.transport?.phone}</p>
        <p><strong>Vehicle:</strong> ${data.transport?.vehicleNumber}</p>
      `;
    }


    // 🆕 PAYMENT CONFIRMED
    if (type === "TRANSPORT_PAYMENT_RECEIVED") {
      subject = "✅ Transport Booking Confirmed & Advance Paid";

      html = `
        <h3>Transport Confirmed</h3>
        <p><strong>User:</strong> ${data.userName}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Total Amount:</strong> ₹${data.totalAmount}</p>
        <p><strong>Advance Paid:</strong> ₹${data.advance}</p>
        <p><strong>Pickup:</strong> ${data.pickup}</p>
        <p><strong>Delivery:</strong> ${data.delivery}</p>
      `;
    }
    await transporter.sendMail({
      from: `" Transport" <${process.env.MAIL_USER}>`,
      to: data.email,
      subject,
      html,
    });

    console.log("Mail sent to:", data.email);

  } catch (error) {
    console.error("Mail sending failed:", error.message);
  }
};
