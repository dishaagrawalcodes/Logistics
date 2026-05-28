import API from "./axios";

export const getUserRequests = () =>
  API.get("/requests/my-requests");

export const createAdvanceOrder = (data) =>
  API.post("/requests/create-order", data);

export const verifyAdvancePayment = (data) =>
  API.post("/requests/verify-payment", data);

export const userRejectQuotation = (id, data) =>
  API.post(`/requests/user-reject/${id}`, data);
