import axiosInstance from "../utils/axiosInstance";


export const questionService = {
  v(query = "") {
    return axiosInstance.get(`/questions${query}`);
  },
};