const transporter = require("./transporter");
const emailTemplate = require("./emailTemplate");  // 👈 ADD THIS

exports.sendUserMail = async (type, data) => {
  let to = data.email;
  let subject = "";
  let title = "";
  let message = "";
  let html = "";

  switch (type) {

    case "NEW_SERVICE_REQUEST":
      subject = "New Service Request Available 🚨";
      title = "New Service Request";

      const {
        userName = "User",
        service = "N/A",
        pin = "N/A",
      } = data;

      message = `
        <p>Hello,</p>

        <p>A new service request is available in your area.</p>

        <ul>
          <li><strong>User Name:</strong> ${userName}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Pincode:</strong> ${pin}</li>
        </ul>

        <p>Please log in to your dashboard to accept or reject the request.</p>
      `;
      break;

    case "SERVICE_ACCEPTED":
      subject = "Your Service Request Has Been Accepted 🎉";
      title = "Service Accepted";

      const {
        
        labourName = "Service Provider",
        labourPhone = "N/A",
        
        amount = "N/A",
      } = data;

      message = `
        <p>Hello <strong>${userName}</strong>,</p>

        <p>Great news! Your service request has been accepted.</p>

        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Amount:</strong> ₹${amount}</li>
          <li><strong>Provider Name:</strong> ${labourName}</li>
          <li><strong>Contact:</strong> ${labourPhone}</li>
        </ul>

        <p>The service provider will contact you shortly.</p>

        <p>Thank you for using our platform 🙌</p>
      `;
      break;

    case "SERVICE_REJECTED":
      subject = "Service Request Update";
      title = "Service Rejected";
      message = `
        <p>Hello <strong>${data.userName}</strong>,</p>
        <p>Your request for ${data.service} was rejected.</p>
      `;
      break;

    /* ✅ ADD THIS PROPERLY */
    case "QUOTATION_SENT":
      subject = "New Quotation Received 💰";
      title = "Quotation Available";
      message = `
        <p>Hello <strong>${data.userName}</strong>,</p>
        <p>You received a quotation for <strong>${data.service}</strong>.</p>
        <ul>
          <li><strong>Provider:</strong> ${data.providerName}</li>
          <li><strong>Amount:</strong> ₹${data.amount}</li>
        </ul>
        <p>Please login to accept or reject it.</p>
      `;
      break;

case "TRANSPORT_QUOTATION_RECEIVED":
  subject = "🚚 New Transport Quotation Received";
  title = "Transport Quotation Available";
  message = `
    <p>Hello <strong>${data.userName}</strong>,</p>
    <p>You have received a transport quotation.</p>
    <ul>
      <li><strong>Provider:</strong> ${data.providerName}</li>
      <li><strong>Amount:</strong> ₹${data.amount}</li>
      <li><strong>Pickup:</strong> ${data.pickup}</li>
      <li><strong>Delivery:</strong> ${data.delivery}</li>
    </ul>
    <p>Please login to accept or reject it.</p>
  `;
  break;

    /* ✅ ADD PAYMENT CONFIRMATION */
    case "PAYMENT_RECEIVED":
      subject = "Advance Payment Received 🎉";
      title = "Payment Confirmation";
      message = `
        <p>Hello <strong>${data.providerName}</strong>,</p>
        <p>A customer has accepted your quotation.</p>
        <ul>
          <li><strong>Customer:</strong> ${data.userName}</li>
          <li><strong>Service:</strong> ${data.service}</li>
          <li><strong>Total Amount:</strong> ₹${data.amount}</li>
          <li><strong>Advance Paid:</strong> ₹${data.advance}</li>
        </ul>
        <p>Status: Confirmed</p>
      `;
      break;

    default:
      throw new Error("Invalid mail type");
  }

  html = emailTemplate(title, message, data);

  console.log("📧 Sending mail →", type, "→", to);

  await transporter.sendMail({
    from: `"Service System" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("✅ Mail sent successfully →", to);
};
