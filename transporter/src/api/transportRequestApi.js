import API from "./axios";

export const getTransportProviderRequests = () =>
  API.get("/transport-requests/provider");

export const sendTransportQuotation = (id, data) =>
  API.post(`/transport-requests/quote/${id}`, data);

export const getUserTransportRequests = () =>
  API.get("/transport-requests/user");
