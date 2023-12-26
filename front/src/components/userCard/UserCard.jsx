import { useContext, useMemo } from "react";
import styles from "./user-card.module.css";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";

export const UserCard = ({ userRecord, handleOpenModal, setSelectedUser }) => {
  const { deleteUserById } = useContext(UserContext);
  const { user } = useContext(AuthContext);

  const createRandomGradient = () => {
    let orientation = "45deg";
    let firstColor = Math.floor(Math.random() * 360);
    let secondColor = Math.floor(Math.random() * 360);
    let alpha = 0;
    let saturation = Math.floor(Math.random() * 10) + 50;
    const gradientHSLLine = [
      `hsl(${firstColor}deg, ${saturation}%, 50%) ${alpha}%`,
    ];

    const difference =
      firstColor < secondColor
        ? secondColor - firstColor
        : firstColor - secondColor;

    const step = Math.floor(difference / 10);

    for (let i = 0; i < 9; i++) {
      gradientHSLLine.push(
        `hsl(${(firstColor += step)}deg, ${saturation}%, 50%) ${(alpha += 11)}%`
      );
    }

    return `linear-gradient(${orientation}, ${gradientHSLLine.join(", ")})`;
  };

  const gradientStyle = useMemo(() => {
    return { backgroundImage: createRandomGradient() };
  }, []);

  const handleDeleteUser = (e) => {
    console.log("user deleted", userRecord);
    if (userRecord && userRecord.id) {
      deleteUserById(userRecord.id);
      toast.success("Utilisateur supprimé !");
    }
  };

  const handleEditUser = (e) => {
    console.log("edit user", userRecord);
    setSelectedUser(userRecord);
    handleOpenModal();
    // editUserById(user.id);
  };

  return (
    <>
      <div className={styles.userCard__container}>
        <div
          style={gradientStyle}
          className={styles.userCard__overlayGradient}
        ></div>
        <div className={styles.userCard__leftSide}>
          <div className={styles.userCard__imageContainer}>
            <img
              src={userRecord.image_link}
              alt={`avatar ${userRecord.firstname}`}
              className={styles.userCard__image}
            />
          </div>
          <div className={styles.userCard__roleContainer}>
            <p className={styles.userCard__role}>{userRecord.role}</p>
          </div>
        </div>

        <div className={styles.userCard__contentContainer}>
          <p className={styles.userCard__cardTitle}>
            {userRecord.firstname} {userRecord.lastname}
          </p>
          <div className={styles.userCard_faceBContainer}>
            <p className={styles.userCard__commonText}>{userRecord.email}</p>
            <p className={styles.userCard__commonText}>{userRecord.age} ans</p>
            {user?.role === "admin" ? (
              <div className={styles.userCard__ctaContainer}>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 16 16"
                  className={styles.userCard__cta}
                  onClick={handleDeleteUser}
                >
                  <g
                    transform="matrix(.7 0 0 .7 .6 -6.7)"
                    style={{ display: "inline" }}
                    id="layer4"
                  >
                    <path
                      id="rect833"
                      transform="translate(-.857 9.571) scale(1.42857)"
                      d="M3 6v8c0 .554.446 1 1 1h8c.554 0 1-.446 1-1V6z"
                      fill={`var(--dark-color)`}
                    />

                    <path
                      id="rect840"
                      transform="translate(-.857 9.571) scale(1.42857)"
                      d="M5 1v2H2v2h12V3h-3V1zm1 1h4v1H6z"
                      fill={`var(--dark-color)`}
                    />
                  </g>
                </svg>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={styles.userCard__cta}
                  onClick={handleEditUser}
                >
                  <path
                    d="M15.9087 3.87352C16.4681 3.31421 17.2266 3 18.0176 3C18.4093 3 18.7971 3.07714 19.1589 3.22702C19.5208 3.3769 19.8495 3.59658 20.1265 3.87352C20.4034 4.15046 20.6231 4.47924 20.773 4.84108C20.9229 5.20292 21 5.59074 21 5.98239C21 6.37404 20.9229 6.76186 20.773 7.1237C20.6231 7.48554 20.4034 7.81432 20.1265 8.09126L19.0231 9.19466C18.6326 9.58519 17.9994 9.58519 17.6089 9.19467L14.8053 6.39114C14.4148 6.00062 14.4148 5.36745 14.8053 4.97693L15.9087 3.87352ZM13.3911 7.80536C13.0006 7.41483 12.3674 7.41483 11.9769 7.80536L5.01084 14.7714C4.37004 15.4122 3.91545 16.2151 3.69566 17.0943L3.02986 19.7575C2.94467 20.0982 3.04452 20.4587 3.2929 20.7071C3.54128 20.9555 3.90177 21.0553 4.24254 20.9701L6.90572 20.3043C7.78488 20.0846 8.58778 19.63 9.22857 18.9892L16.1946 12.0231C16.5852 11.6326 16.5852 10.9994 16.1946 10.6089L13.3911 7.80536Z"
                    fill={`var(--dark-color)`}
                  />
                  <path
                    d="M12 20C12 19.4477 12.4477 19 13 19L20 19C20.5523 19 21 19.4477 21 20C21 20.5523 20.5523 21 20 21L13 21C12.4477 21 12 20.5523 12 20Z"
                    fill={`var(--dark-color)`}
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
