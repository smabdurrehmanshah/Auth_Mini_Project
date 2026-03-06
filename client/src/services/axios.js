import axios from "axios";

export const api = axios.create({
  baseURL: "https://auth-mini-project-k879d68f8-abdur-rehman-shahs-projects.vercel.app",
  withCredentials: true,
});
