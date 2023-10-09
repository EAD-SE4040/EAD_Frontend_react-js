import { useState } from "react";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { useUser } from "./Components/commonData";
import Login from "./Pages/Login/Login";

function App() {
  const { user, setUser } = useUser();
  const storedLogin = localStorage.getItem("Login");
  console.log(storedLogin)
  return (
    <div className="App">
      <AppHeader />
      {storedLogin === "true" ? <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div> : <Login/>}
      <AppFooter />
    </div>
  );
}
export default App;
