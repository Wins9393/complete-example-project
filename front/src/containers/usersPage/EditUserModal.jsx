import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./users.module.css";
import UserContext from "../../contexts/UserContext";

export const EditUserModal = ({ isOpen, handleOpenModal, selectedUser }) => {
  const [newUser, setNewUser] = useState(selectedUser);
  const { editUserById } = useContext(UserContext);

  useEffect(() => {
    setNewUser(selectedUser);
  }, [selectedUser]);

  const handleConfirmButton = () => {
    console.log("new user", newUser);
    if (newUser.firstname && newUser.lastname && newUser.age && newUser.role) {
      editUserById(selectedUser.id, newUser);
      handleOpenModal();
      toast.success("Utilisateur modifié !");
    }
  };

  const handleFirstnameChange = (e) => {
    console.log(e.target.value);
    setNewUser((oldUser) => ({ ...oldUser, firstname: e.target.value }));
  };

  const handleLastnameChange = (e) => {
    console.log(e.target.value);
    setNewUser((oldUser) => ({ ...oldUser, lastname: e.target.value }));
  };

  const handleAgeChange = (e) => {
    console.log(e.target.value);
    setNewUser((oldUser) => ({ ...oldUser, age: e.target.value }));
  };

  const handleImageChange = (e) => {
    console.log(e.target.value);
    setNewUser((oldUser) => ({ ...oldUser, image_link: e.target.value }));
  };

  const handleRoleChange = (e) => {
    console.log(e.target.value);
    setNewUser((oldUser) => ({ ...oldUser, role: e.target.value }));
  };

  return (
    <div
      style={isOpen ? { display: "flex" } : { display: "none" }}
      className={styles.usersPage__editUserModalContainer}
    >
      <div className={styles.usersPage__editUserModalContent}>
        <div className={styles.usersPage__editUserModalFormContainer}>
          <div className={styles.usersPage__editUserModalFormInputs}>
            <div className={styles.usersPage__editUserModalFormItem}>
              <label style={{ color: "var(--light-color)" }}>Firstname</label>
              <input
                type="text"
                placeholder="Firstname"
                value={newUser.firstname || ""}
                onChange={handleFirstnameChange}
              />
            </div>

            <div className={styles.usersPage__editUserModalFormItem}>
              <label>Lastname</label>
              <input
                type="text"
                placeholder="Lastname"
                value={newUser.lastname || ""}
                onChange={handleLastnameChange}
              />
            </div>

            <div className={styles.usersPage__editUserModalFormItem}>
              <label>Age</label>
              <input
                type="number"
                placeholder="Age"
                value={newUser.age || ""}
                onChange={handleAgeChange}
              />
            </div>

            <div className={styles.usersPage__editUserModalFormItem}>
              <label>Image link</label>
              <input
                type="text"
                placeholder="Image link"
                value={newUser.image_link || ""}
                onChange={handleImageChange}
              />
            </div>

            <div className={styles.usersPage__editUserModalFormItem}>
              <label>Rôle</label>
              {/* <input
              type="text"
              placeholder="Role"
              value={newUser.role || ""}
              onChange={handleRoleChange}
            /> */}
              <select
                required
                onChange={handleRoleChange}
                value={newUser.role || ""}
              >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="developper">Developper</option>
                <option value="teacher">Teacher</option>
                <option value="designer">Designer</option>
                <option value="student">Student</option>
                <option value="Tester">Tester</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.usersPage__editUserModalCTAContainer}>
          <button onClick={handleConfirmButton}>Modifier</button>
          <button onClick={handleOpenModal}>Fermer</button>
        </div>
      </div>
    </div>
  );
};
