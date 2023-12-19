import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import styles from "./users.module.css";
import { UserCard } from "../../components/userCard/UserCard";

export const UsersPage = () => {
  const { users } = useContext(UserContext);

  useEffect(() => {
    console.log("users: ", users);
  }, [users]);

  return (
    <div className={styles.usersPage__mainContainer}>
      {users?.length > 0
        ? users.map((user) => <UserCard key={user.email} user={user} />)
        : "Chargement..."}
    </div>
  );
};
