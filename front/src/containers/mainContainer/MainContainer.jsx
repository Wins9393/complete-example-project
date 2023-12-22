import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "./main-container.module.css";
import { useLocation } from "react-router-dom";

export const MainContainer = ({ children }) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  if (
    !user &&
    location.pathname != "/login" &&
    location.pathname != "/register"
  ) {
    return (
      <div className={styles.mainContainer}>
        <h2 style={{ color: "#fff" }}>Vous n'êtes pas authentifié !</h2>
      </div>
    );
  }
  return <div className={styles.mainContainer}>{children}</div>;
};
