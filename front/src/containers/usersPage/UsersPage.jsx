import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import styles from "./users.module.css";
import { UserCard } from "../../components/userCard/UserCard";
import { EditUserModal } from "./EditUserModal";
import { ActionBar } from "../../components/action-bar/ActionBar";
import AuthContext from "../../contexts/AuthContext";

export const UsersPage = () => {
  const { users } = useContext(UserContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    console.log("users: ", users);
  }, [users]);

  const handleOpenModal = () => {
    setIsOpen((oldIsOpen) => !oldIsOpen);
  };

  return (
    <>
      {user.role === "admin" ? <ActionBar /> : ""}
      <div className={styles.usersPage__mainContainer}>
        {users?.length > 0
          ? users.map((userRecord) => (
              <UserCard
                key={userRecord.email}
                userRecord={userRecord}
                setSelectedUser={setSelectedUser}
                handleOpenModal={handleOpenModal}
              />
            ))
          : "Chargement..."}
      </div>
      <EditUserModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        selectedUser={selectedUser}
      />
    </>
  );
};
