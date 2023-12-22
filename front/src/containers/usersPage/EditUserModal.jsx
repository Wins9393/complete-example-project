import { useState } from "react";
import styles from "./users.module.css";

export const EditUserModal = ({ isOpen, handleOpenModal, selectedUser }) => {
  const [newUser, setNewUser] = useState(selectedUser);

  const handleConfirmButton = () => {
    console.log(selectedUser);
  };

  const handleFirstnameChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div
      style={isOpen ? { display: "flex" } : { display: "none" }}
      className={styles.usersPage__editUserModalContainer}
    >
      <div className={styles.usersPage__editUserModalContent}>
        <div className={styles.usersPage__editUserModalFormContainer}>
          <input
            type="text"
            placeholder="Firstname"
            defaultValue={selectedUser.firstname}
            onChange={handleFirstnameChange}
          />
          <input type="text" placeholder="Lastname" />
          <input type="number" placeholder="Age" />
          <input type="text" placeholder="Image link" />
          <input type="text" placeholder="Role" />
        </div>
        <div className={styles.usersPage__editUserModalCTAContainer}>
          <button onClick={handleConfirmButton}>Modifier</button>
          <button onClick={handleOpenModal}>Fermer</button>
        </div>
      </div>
    </div>
  );
};
