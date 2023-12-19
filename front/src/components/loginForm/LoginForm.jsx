import { useContext, useState } from "react";
import styles from "./login-form.module.css";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password, () => navigate("/"));
  };

  return (
    <div className={styles.loginForm__container}>
      <form>
        <div className={styles.formItem}>
          <label>Email</label>
          <input
            type="text"
            onChange={handleChangeEmail}
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.formItem}>
          <label>Password</label>
          <input
            type="text"
            onChange={handleChangePassword}
            placeholder="Enter your password"
          />
        </div>
        <div className={styles.formItem}>
          <button onClick={handleLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};
