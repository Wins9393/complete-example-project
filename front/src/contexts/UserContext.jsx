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
    console.log(id, newUser);
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

  async function createUser(
    firstname,
    lastname,
    image_link,
    email,
    password,
    age,
    role
  ) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/create`,
        {
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
        }
      );

      const data = await response.json();

      if (response.status === 201) {
        console.log("data create user: ", data);
        setUsers((oldUsers) => [...oldUsers, ...data]);
      }
    } catch (error) {
      console.log("ERREUR: ", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        deleteUserById,
        editUserById,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { Provider };
export default UserContext;
