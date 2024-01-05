import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "./account-page.module.css";
import { toast } from "react-toastify";

export const AccountPage = () => {
  const { user } = useContext(AuthContext);
  const { editConnectedUser } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState(user);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (isEdited) {
      editConnectedUser(user.id, userInfos);
      toast.success("Informations personnelles modifiées avec succès !");
    }
  }, [isEdited]);

  const onValidate = () => {
    for (let key in userInfos) {
      for (let originalKey in user) {
        if (userInfos[key] !== user[originalKey]) {
          setIsEdited(true);
        }
      }
    }
  };

  const onEditImageClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  const onHandleChange = (e, field) => {
    if (field === "firstname") {
      setUserInfos((oldUser) => ({ ...oldUser, firstname: e.target.value }));
    }
    if (field === "lastname") {
      setUserInfos((oldUser) => ({ ...oldUser, lastname: e.target.value }));
    }
    if (field === "age") {
      setUserInfos((oldUser) => ({ ...oldUser, age: e.target.value }));
    }
    if (field === "role") {
      setUserInfos((oldUser) => ({ ...oldUser, role: e.target.value }));
    }
    if (field === "image_link") {
      setUserInfos((oldUser) => ({ ...oldUser, image_link: e.target.value }));
    }
  };

  return (
    <div className={styles.accountPage__container}>
      <p style={{ marginBottom: "-28px" }}>{user.email}</p>
      <div className={styles.accountPage__globalImageContainer}>
        <div className={styles.accountPage__imageContainer}>
          <img
            src={userInfos.image_link || ""}
            alt="avatar"
            className={styles.accountPage__image}
          />
          <svg
            width="28px"
            height="28px"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.accountPage__editIcon}
            onClick={(e) => onEditImageClick(e)}
          >
            <path
              d="M15.9087 3.87352C16.4681 3.31421 17.2266 3 18.0176 3C18.4093 3 18.7971 3.07714 19.1589 3.22702C19.5208 3.3769 19.8495 3.59658 20.1265 3.87352C20.4034 4.15046 20.6231 4.47924 20.773 4.84108C20.9229 5.20292 21 5.59074 21 5.98239C21 6.37404 20.9229 6.76186 20.773 7.1237C20.6231 7.48554 20.4034 7.81432 20.1265 8.09126L19.0231 9.19466C18.6326 9.58519 17.9994 9.58519 17.6089 9.19467L14.8053 6.39114C14.4148 6.00062 14.4148 5.36745 14.8053 4.97693L15.9087 3.87352ZM13.3911 7.80536C13.0006 7.41483 12.3674 7.41483 11.9769 7.80536L5.01084 14.7714C4.37004 15.4122 3.91545 16.2151 3.69566 17.0943L3.02986 19.7575C2.94467 20.0982 3.04452 20.4587 3.2929 20.7071C3.54128 20.9555 3.90177 21.0553 4.24254 20.9701L6.90572 20.3043C7.78488 20.0846 8.58778 19.63 9.22857 18.9892L16.1946 12.0231C16.5852 11.6326 16.5852 10.9994 16.1946 10.6089L13.3911 7.80536Z"
              fill={`var(--accent-color)`}
            />
            <path
              d="M12 20C12 19.4477 12.4477 19 13 19L20 19C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21L13 21C12.4477 21 12 20.5523 12 20Z"
              fill={`var(--accent-color)`}
            />
          </svg>
        </div>
        <input
          style={isInputVisible ? { display: "flex" } : { display: "none" }}
          className={styles.accountPage__emptyEditableInput}
          type="text"
          value={userInfos.image_link || ""}
          onChange={(e) => onHandleChange(e, "image_link")}
        />
      </div>
      <div className={styles.accountPage__userInfosContainer}>
        <div className={styles.accountPage__editableInputGroup}>
          <p className={styles.accountPage__editableInput_label}>Prénom</p>
          <input
            type="text"
            className={styles.accountPage__editableInput}
            value={userInfos.firstname || ""}
            onChange={(e) => onHandleChange(e, "firstname")}
          />
        </div>
        <div className={styles.accountPage__editableInputGroup}>
          <p className={styles.accountPage__editableInput_label}>Nom</p>
          <input
            type="text"
            className={styles.accountPage__editableInput}
            value={userInfos.lastname || ""}
            onChange={(e) => onHandleChange(e, "lastname")}
          />
        </div>
        <div className={styles.accountPage__editableInputGroup}>
          <p className={styles.accountPage__editableInput_label}>Age</p>
          <input
            type="number"
            className={styles.accountPage__editableInput}
            value={userInfos.age || ""}
            onChange={(e) => onHandleChange(e, "age")}
          />
        </div>
        {user.role === "admin" ? (
          <div className={styles.accountPage__editableInputGroup}>
            <p className={styles.accountPage__editableInput_label}>Rôle</p>
            <select
              className={styles.accountPage__editableInput}
              value={userInfos.role || ""}
              onChange={(e) => onHandleChange(e, "role")}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="developper">Developper</option>
              <option value="teacher">Teacher</option>
              <option value="designer">Designer</option>
              <option value="student">Student</option>
              <option value="tester">Tester</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      <button onClick={onValidate}>Valider</button>
    </div>
  );
};
