import { NavLink } from "react-router-dom";
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
              <NavLink onClick={logout} className={styles.navbar__link}>
                Logout
              </NavLink>
            </li>
          </ul>
          <ul className={styles.navbar__list}>
            <li>
              <NavLink
                to={"/users"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.navbar__link}`
                    : styles.navbar__link
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/account"}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.navbar__link}`
                    : styles.navbar__link
                }
              >
                My Account
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <ul className={styles.navbar__list}>
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navbar__link}`
                  : styles.navbar__link
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/register"}
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navbar__link}`
                  : styles.navbar__link
              }
            >
              Register
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};
