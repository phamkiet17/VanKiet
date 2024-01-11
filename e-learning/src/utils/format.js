// utils/format.js
import moment from "moment";

// ---- Format number to display currency ----//
// ---- Format date to display with format ----//
export const formatDate = (date,format ="DD/MM/YYYY") => {
  return moment(date).format(format);
};
export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};
