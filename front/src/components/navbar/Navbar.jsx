import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.navbar__container}>
      {user ? (
        <>
          <ul className={styles.navbar__list}>
            <li>
              <Link onClick={logout}>Logout</Link>
            </li>
          </ul>
          <ul className={styles.navbar__list}>
            <li>
              <Link to={"/users"}>Users</Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className={styles.navbar__list}>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
