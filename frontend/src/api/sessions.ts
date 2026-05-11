import axiosInstance from "../lib/axios";

export interface CreateSessionPayload {
  problem: string;
  difficulty: string;
}

export const sessionApi = {
  createSession: async (data: CreateSessionPayload) => {
    const response = await axiosInstance.post("/sessions", data);
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get("/sessions/active");
    return response.data;
  },

  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("sessions/my-recent");
    return response.data;
  },

  getSessionById: async (id: string) => {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },

  joinSession: async (id: string) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return response.data;
  },

  endSession: async (id: string) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return response.data;
  },

  getStreamToken: async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
};