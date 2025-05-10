import { axiosClient } from "../../api/axios";

const SsiApi = {
  login: async (email, password) => {
    return await axiosClient.post("/api/login", { email, password });
  },
  logout: async () => {
    return await axiosClient.post("/api/logout");
  },
  getUser: async ({ signal } = {}) => {
    return axiosClient.get("/api/user", { signal });
  },
};

export default SsiApi;
