import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "./main-container.module.css";

export const MainContainer = ({ children, pathname }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  if (!user && pathname != "/login" && pathname != "/register") {
    return (
      <div className={styles.mainContainer}>
        <h2 style={{ color: "#fff" }}>Vous n'êtes pas authentifié !</h2>
      </div>
    );
  }
  return <div className={styles.mainContainer}>{children}</div>;
};
