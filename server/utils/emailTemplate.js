module.exports = (title, message, data) => {

 return `
  <div style="font-family:Arial;padding:20px">
    <h2>${title}</h2>
    <p>${message}</p>

    ${data.shipmentNo || data.pickupAddress ? `
      <hr/>
      <p><b>Shipment Details</b></p>
      <p>Name: ${data.name || ""}</p>
      <p>Pickup: ${data.pickupAddress || "-"}</p>
      <p>Delivery: ${data.deliveryAddress || "-"}</p>
    ` : ""}

  </div>
 `;
};
