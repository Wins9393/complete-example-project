import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const UserContext = createContext({});

const Provider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, [user]);

  async function getUsers() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersData = await response.json();

      if (response.status === 200) {
        setUsers(usersData);
      }
    } catch (error) {
      setUsers(null);
      console.log("error: ", error);
    }
  }

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
