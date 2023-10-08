import { useState } from "react";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";

function App(props) {

  const [isLogin, setIsLogin] = useState(false)
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </div>
      <AppFooter />
    </div>
  );
}
export default App;
