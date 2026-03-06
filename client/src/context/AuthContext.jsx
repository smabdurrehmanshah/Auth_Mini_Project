import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://auth-mini-project-k879d68f8-abdur-rehman-shahs-projects.vercel.app/api/v1/users/me",
          {
            withCredentials: true,
          },
        );

        setUser(response?.data?.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
