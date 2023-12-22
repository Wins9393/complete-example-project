import { Outlet } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Navbar } from "./components/navbar/Navbar";
import { MainContainer } from "./containers/mainContainer/MainContainer";

function App() {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

export default App;
