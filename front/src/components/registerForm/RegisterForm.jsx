import { useContext, useState } from "react";
import styles from "./register-form.module.css";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [userInfos, setUserInfos] = useState({});
  const [errors, setErrors] = useState({});
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFirstname = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, firstname: e.target.value };
    });
  };

  const handleLastname = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, lastname: e.target.value };
    });
  };

  const handleImage = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, image_link: e.target.value };
    });
  };

  const handleEmail = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, password: e.target.value };
    });
  };

  const handleAge = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, age: e.target.value };
    });
  };

  const handleRole = (e) => {
    setUserInfos((oldUserInfos) => {
      return { ...oldUserInfos, role: e.target.value };
    });
  };

  const validateForm = (userInfos) => {
    setErrors({});

    if (!userInfos.firstname) {
      setErrors((oldErrors) => {
        return { ...oldErrors, firstname: "Le champs firstname est requis !" };
      });
    }

    if (!userInfos.lastname) {
      setErrors((oldErrors) => {
        return { ...oldErrors, lastname: "Le champs lastname est requis !" };
      });
    }

    if (!userInfos.email) {
      setErrors((oldErrors) => {
        return { ...oldErrors, email: "Le champs email est requis !" };
      });
    }

    if (!userInfos.password) {
      setErrors((oldErrors) => {
        return { ...oldErrors, password: "Le champs password est requis !" };
      });
    }

    if (!userInfos.role) {
      setErrors((oldErrors) => {
        return { ...oldErrors, role: "Le champs rôle est requis !" };
      });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    validateForm(userInfos);

    console.log("user infos: ", userInfos);
    if (
      !userInfos.firstname ||
      !userInfos.lastname ||
      !userInfos.email ||
      !userInfos.password ||
      !userInfos.role
    ) {
      return;
    }

    register(
      userInfos.firstname,
      userInfos.lastname,
      userInfos.image_link,
      userInfos.email,
      userInfos.password,
      userInfos.age,
      userInfos.role,
      () => navigate("/users")
    );
  };

  return (
    <div className={styles.registerForm__container}>
      <form className={styles.registerForm__formContainer}>
        <div className={styles.registerForm__formInputs}>
          <div className={styles.registerForm__formItem}>
            <label>Firstname</label>
            <input
              required
              onChange={handleFirstname}
              type="text"
              placeholder="Enter your firstname"
            />
            {errors.firstname && (
              <p className="form_error">{errors.firstname}</p>
            )}
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Lastname</label>
            <input
              required
              onChange={handleLastname}
              type="text"
              placeholder="Enter your lastname"
            />
            {errors.lastname && <p className="form_error">{errors.lastname}</p>}
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Image (link)</label>
            <input
              onChange={handleImage}
              type="text"
              placeholder="Enter an image link"
            />
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Age</label>
            <input
              onChange={handleAge}
              type="number"
              pattern="\d*"
              placeholder="Enter your age"
            />
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Role</label>
            <select required onChange={handleRole}>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="developper">Developper</option>
              <option value="teacher">Teacher</option>
              <option value="designer">Designer</option>
              <option value="student">Student</option>
              <option value="tester">Tester</option>
            </select>
            {errors.role && <p className="form_error">{errors.role}</p>}
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Email</label>
            <input
              required
              onChange={handleEmail}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className="form_error">{errors.email}</p>}
          </div>
          <div className={styles.registerForm__formItem}>
            <label>Password</label>
            <input
              required
              onChange={handlePassword}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && <p className="form_error">{errors.password}</p>}
          </div>
        </div>

        <div className={styles.formItem}>
          <button onClick={handleRegister}>S'inscrire</button>
        </div>
      </form>
    </div>
  );
};
