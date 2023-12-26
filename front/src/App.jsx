import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { MainContainer } from "./containers/mainContainer/MainContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

function App() {
  let location = useLocation();

  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <MainContainer pathname={location.pathname}>
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
