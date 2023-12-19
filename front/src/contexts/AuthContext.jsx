import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnectedUser();
  }, [isConnected]);

  const getConnectedUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setUser(data.user);
        setIsConnected(data.authenticated);
      } else {
        setUser(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const login = async (email, password, onSuccess) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      setUser(data.user);
      setIsConnected(data.authenticated);
      if (onSuccess && response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.log("ERREUR: ", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        console.log("Déconnexion réussie !");
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (
    firstname,
    lastname,
    image_link,
    email,
    password,
    age,
    role,
    onSuccess
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          image_link,
          email,
          password,
          age,
          role,
        }),
      });

      const data = await response.json();

      setUser(data.user);
      setIsConnected(data.authenticated);
      if (onSuccess && response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.log("ERREUR: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isConnected, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Provider };
export default AuthContext;