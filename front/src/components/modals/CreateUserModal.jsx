export const CreateUserModal = ({ isOpenCreate, handleOpenModal }) => {
  return (
    <h1 style={isOpenCreate ? { display: "flex" } : { display: "none" }}>
      MODAL CREATE
    </h1>
  );
};
