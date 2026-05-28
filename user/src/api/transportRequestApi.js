import API from "./axios";

export const getUserTransportRequests = () =>
  API.get("/transport-requests/user");

export const createTransportOrder = (data) =>
  API.post("/transport-requests/create-order", data);

export const verifyTransportAdvancePayment = (data) =>
  API.post("/transport-requests/verify-payment", data);
