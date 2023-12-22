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

  async function deleteUserById(id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/delete/${id}`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("DELETE DATA: ", response);
        setUsers((oldUsers) => [...oldUsers.filter((user) => user.id !== id)]);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function editUserById(id, newUser) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/edit/${id}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            image_link: newUser.image_link || null,
            age: newUser.age || null,
            role: newUser.role,
          }),
        }
      );

      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.id === newUser.id ? newUser : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <UserContext.Provider value={{ users, deleteUserById, editUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
