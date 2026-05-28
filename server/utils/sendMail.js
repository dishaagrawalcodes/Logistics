const transporter = require("./transporter");
const emailTemplate = require("./emailTemplate");
exports.sendShipmentMail = async (type, shipment) => {

 let to = shipment.email;
 let subject = "";
 let title = "";
 let message = "";

 // ---------------- ADMIN ----------------
 if (type === "ADMIN") {

  to = process.env.ADMIN_MAIL;
  subject = "New Shipment Request Received";
  title = "New Shipment Request";

  message = `A new shipment request has been submitted by ${shipment.name}.`;
 }

 // ---------------- CUSTOMER ACCEPTED ----------------
 if (type === "ACCEPTED") {

  subject = "Shipment Accepted Successfully";
  title = "Shipment Confirmed";

  message = `
   Your shipment has been accepted successfully.<br/><br/>

   <b>Shipment No:</b> ${shipment.shipmentNo}<br/><br/>

   <b>Driver Name:</b> ${shipment.driver.name}<br/>
   <b>Driver Phone:</b> ${shipment.driver.phone}<br/>
   <b>Vehicle No:</b> ${shipment.driver.vehicleNo}
  `;
 }

 // ---------------- DRIVER MAIL ----------------
 if (type === "DRIVER") {

  to = shipment.driver.email;

  subject = "New Shipment Assigned";
  title = "Delivery Assignment";

  message = `
   You have been assigned a new shipment.<br/><br/>

   <b>Customer Name:</b> ${shipment.name}<br/>
   <b>Customer Phone:</b> ${shipment.mobile}<br/><br/>

   <b>Pickup Address:</b> ${shipment.pickupAddress}<br/>
   <b>Delivery Address:</b> ${shipment.deliveryAddress}<br/><br/>

   <b>Advance Payment:</b> ₹${shipment.advancePayment}<br/>
   <b>Remaining Payment:</b> ₹${shipment.remainingPayment}
  `;
 }

 // ---------------- REJECT ----------------
 if (type === "REJECTED") {

  subject = "Shipment Rejected";
  title = "Shipment Request Rejected";

  message = `
   Your shipment request was rejected.<br/><br/>
   Reason: ${shipment.rejectionReason}
  `;
 }

 // ---------------- DELIVERED ----------------
 if (type === "DELIVERED") {

  subject = "Shipment Delivered Successfully";
  title = "Shipment Delivered";

  message = "Your shipment has been delivered successfully. Thank you for choosing us!";
 }
 
// ---------------- PROVIDER APPROVED ----------------
if (type === "PROVIDER_APPROVED") {

  subject = "Provider Application Approved";
  title = "Welcome Onboard 🎉";

  message = `
    Dear ${shipment.name},<br/><br/>

    Your provider application has been approved.<br/><br/>

    <b>Login ID:</b> ${shipment.loginId}<br/>
    <b>Password:</b> ${shipment.plainPassword}<br/><br/>

    Please change your password after first login.
  `;
}





// ---------------- PROVIDER REJECTED ----------------
if (type === "PROVIDER_REJECTED") {

  subject = "Provider Application Rejected";
  title = "Application Update";

  message = `
    Dear ${shipment.name},<br/><br/>
    Your provider application was rejected.<br/><br/>
    Reason: ${shipment.rejectionReason}
  `;
}
// ---------------- TRANSPORT APPROVED ----------------
if (type === "TRANSPORT_APPROVED") {

  subject = "Transport Application Approved";
  title = "Transport Partner Approved 🚚";

  message = `
    Dear ${shipment.name},<br/><br/>

    Your transport partner application has been approved.<br/><br/>

    <b>Login ID:</b> ${shipment.loginId}<br/>
    <b>Password:</b> ${shipment.plainPassword}<br/><br/>

    <b>Vehicle:</b> ${shipment.vehicleName}<br/>
    <b>Vehicle No:</b> ${shipment.vehicleNumber}<br/><br/>

    Please login and change your password after first login.
  `;
}
// ---------------- TRANSPORT REJECTED ----------------
if (type === "TRANSPORT_REJECTED") {

  subject = "Transport Application Rejected";
  title = "Application Update";

  message = `
    Dear ${shipment.name},<br/><br/>

    Your transport partner application was rejected.<br/><br/>

    Reason: ${shipment.rejectionReason || "Not specified"}<br/><br/>

    You may reapply after correcting the documents.
  `;
}



 const html = emailTemplate(title, message, shipment);
console.log("📧 Sending mail →", type, "→", to);
 await transporter.sendMail({
  from: `"Shipment System" <${process.env.MAIL_USER}>`,
  to,
  subject,
  html
 });

 console.log("✅ Mail sent successfully →", to);
};

