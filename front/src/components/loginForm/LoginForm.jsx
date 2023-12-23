import { useContext, useState } from "react";
import styles from "./login-form.module.css";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setErrors("Tous les champs sont requis !");
    }

    const response = await login(email, password, () => navigate("/users"));
    console.log(response);

    if (!response.success) {
      setErrors(response.message);
    }
  };

  return (
    <div className={styles.loginForm__container}>
      <form className={styles.loginForm__formContainer}>
        <div className={styles.loginForm__formInputs}>
          <div className={styles.loginForm__formItem}>
            <label>Email</label>
            <input
              type="text"
              onChange={handleChangeEmail}
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.loginForm__formItem}>
            <label>Password</label>
            <input
              type="text"
              onChange={handleChangePassword}
              placeholder="Enter your password"
            />
          </div>
        </div>
        {errors && <p className="form_error">{errors}</p>}

        <div className={styles.loginForm__ctaSection}>
          <button onClick={handleLogin}>Se connecter</button>
        </div>
      </form>
    </div>
  );
};
