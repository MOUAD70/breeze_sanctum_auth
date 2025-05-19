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
    try {
      const response = await axiosClient.get(`/api/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
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
  getAllAssignments: async (params = {}) => {
    return axiosClient.get("/api/assignments", { params });
  },
  getOneAssignment: async (id) => {
    return axiosClient.get(`/api/assignments/${id}`);
  },
  createAssignment: async (assignmentData) => {
    return axiosClient.post("/api/assignments", assignmentData);
  },
  updateAssignment: async (id, assignmentData) => {
    return axiosClient.put(`/api/assignments/${id}`, assignmentData);
  },
  deleteAssignment: async (id) => {
    return axiosClient.delete(`/api/assignments/${id}`);
  },

  // Teams CRUD API
  getTeams: async () => {
    return axiosClient.get("/api/teams");
  },
  getOneTeam: async (id) => {
    return axiosClient.get(`/api/teams/${id}`);
  },
  getTeamMembers: async (id) => {
    return axiosClient.get(`/api/teams/${id}/members`);
  },
  createTeam: async (teamData) => {
    return axiosClient.post("/api/teams", teamData);
  },
  updateTeam: async (id, teamData) => {
    return axiosClient.put(`/api/teams/${id}`, teamData);
  },
  deleteTeam: async (id) => {
    return axiosClient.delete(`/api/teams/${id}`);
  },

  // Analytics API
  getAllAnalytics: async () => {
    return axiosClient.get("/api/analytics");
  },
  getIncidentsAnalytics: async () => {
    return axiosClient.get("/api/analytics/incidents");
  },
  getUsersAnalytics: async () => {
    return axiosClient.get("/api/analytics/users");
  },
  getSitesAnalytics: async () => {
    return axiosClient.get("/api/analytics/sites");
  },

  // Attendance API
  getAttendance: async (params = {}) => {
    try {
      console.log("SsiApi.getAttendance called with params:", params);
      const response = await axiosClient.get("/api/attendance", { params });
      console.log("SsiApi.getAttendance response:", response);
      return response;
    } catch (error) {
      console.error("SsiApi.getAttendance error:", error);
      throw error;
    }
  },
  getOneAttendance: async (id) => {
    return axiosClient.get(`/api/attendance/${id}`);
  },
  createAttendance: async (attendanceData) => {
    return axiosClient.post("/api/attendance", attendanceData);
  },
  updateAttendance: async (id, attendanceData) => {
    return axiosClient.put(`/api/attendance/${id}`, attendanceData);
  },
  deleteAttendance: async (id) => {
    return axiosClient.delete(`/api/attendance/${id}`);
  },
};

export default SsiApi;
