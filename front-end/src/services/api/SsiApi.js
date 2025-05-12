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

  // Users CRUD API
  getAllUsers: async (params = {}) => {
    return axiosClient.get("/api/users", { params });
  },
  addUser: async (userData) => {
    return axiosClient.post("/api/users", userData);
  },

  // Sites CRUD API
  getSites: async () => {
    return axiosClient.get("/api/sites");
  },
  getSite: async (id) => {
    return axiosClient.get(`/api/sites/${id}`);
  },
  createSite: async (siteData) => {
    return axiosClient.post("/api/sites", siteData);
  },
  updateSite: async (id, siteData) => {
    return axiosClient.put(`/api/sites/${id}`, siteData);
  },
  deleteSite: async (id) => {
    return axiosClient.delete(`/api/sites/${id}`);
  },
};

export default SsiApi;
