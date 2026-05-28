import API from "./axios";

export const getLabourRequests = () =>
  API.get("/requests/labour");

export const sendQuotation = (id, data) =>
  API.post(`/requests/quote/${id}`, data);

export const getDashboardStats = () =>
  API.get("/requests/dashboard-stats");
