import { axiosClient } from "../../api/axios";

const SsiApi = {
  // Auth API
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
  getOneUser: async (id) => {
    return axiosClient.get(`/api/users/${id}`);
  },
  getAllUsers: async (params = {}) => {
    return axiosClient.get("/api/users", { params });
  },
  addUser: async (userData) => {
    return axiosClient.post("/api/users", userData);
  },
  updateUser: (id, userData) => {
    console.log("API updateUser called with:", id, userData);
    return axiosClient.put(`/api/users/${id}`, userData);
  },
  deleteUser: async (id) => {
    return axiosClient.delete(`/api/users/${id}`);
  },

  // Sites CRUD API
  getOneSite: async (id) => {
    return axiosClient.get(`/api/sites/${id}`);
  },
  getUserSite: async (userId) => {
    return axiosClient.get(`/api/users/${userId}/site`);
  },
  getSites: async () => {
    return axiosClient.get("/api/sites");
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
  getSitesAnalytics: async () => {
    return axiosClient.get("/api/sites-analytics");
  },

  // Incidents CRUD API
  getIncidents: async (params = {}) => {
    return axiosClient.get("/api/incidents", { params });
  },
  getOneIncident: async (id) => {
    return axiosClient.get(`/api/incidents/${id}`);
  },
  createIncident: async (incidentData) => {
    return axiosClient.post("/api/incidents", incidentData);
  },
  updateIncident: async (id, incidentData) => {
    return axiosClient.put(`/api/incidents/${id}`, incidentData);
  },
  deleteIncident: async (id) => {
    return axiosClient.delete(`/api/incidents/${id}`);
  },

  // Current User Assignments API
  getCurrentUserAssignments: async () => {
    return axiosClient.get("/api/assignments/current");
  },
};

export default SsiApi;
