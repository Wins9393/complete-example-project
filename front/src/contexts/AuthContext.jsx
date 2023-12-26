import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext({});

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnectedUser();
    console.log("current user: ", user);
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

      if (response.status === 404) {
        return { success: false, message: "Email ou mot de passe incorrect !" };
      }

      if (onSuccess && response.status === 200) {
        const data = await response.json();

        setUser(data.user);
        setIsConnected(data.authenticated);
        onSuccess();
        toast.success("Connexion réussie !");
        return { success: true };
      }
    } catch (error) {
      console.log("ERREUR: ", error);
      return { success: false, message: "Erreur de connexion." };
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
        toast.success("Déconnexion réussie !");
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

      if (response.status === 200) {
        const data = await response.json();

        setUser(data.user);
        setIsConnected(data.authenticated);
        toast.success("Inscription réussie !");
        if (onSuccess) {
          onSuccess();
        }
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
