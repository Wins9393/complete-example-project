import styles from "./user-card.module.css";

export const UserCard = ({ user }) => {
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

  return (
    <div className={styles.userCard__container}>
      <div
        style={{
          backgroundImage: createRandomGradient(),
        }}
        className={styles.userCard__overlayGradient}
      ></div>
      <div className={styles.userCard__leftSide}>
        <div className={styles.userCard__imageContainer}>
          <img
            src={user.image_link}
            alt={`avatar ${user.firstname}`}
            className={styles.userCard__image}
          />
        </div>
        <div className={styles.userCard__roleContainer}>
          <p className={styles.userCard__role}>{user.role}</p>
        </div>
      </div>

      <div className={styles.userCard__contentContainer}>
        <p className={styles.userCard__cardTitle}>
          {user.firstname} {user.lastname}
        </p>
        <p className={styles.userCard__commonText}>{user.email}</p>
        <p className={styles.userCard__commonText}>{user.age} ans</p>
      </div>
    </div>
  );
};
