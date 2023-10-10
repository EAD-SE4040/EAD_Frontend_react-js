import {
  AppstoreOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../commonData";

function SideMenu() {
  const {user, setUser} = useUser()
  const userData = JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          if(item.key ==="/logout"){
            setUser({
              isAuthenticated: false,
              id:'',
              name:'',
              email:'',
              nic:'',
              phone:'',
              userType:'',
              isActive:''
            });
            localStorage.removeItem("user");
            localStorage.removeItem("Login");
          }
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Trains management",
            key: "/train",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "User management",
            key: "/user",
            icon: <UserOutlined />,
            hidden: userData.userType === "traveler agent" || userData.userType === "Traveler agent",
          },
          {
            label: "Reservation Management",
            key: "/reservation",
            icon: <UserOutlined />,
          },
          {
            label: "Logout",
            key: "/logout",
            icon: <LogoutOutlined />,
          },
        ].filter((item) => !item.hidden)}
      />
    </div>
  );
}
export default SideMenu;
