import {
  AppstoreOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
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
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
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
        ]}
      />
    </div>
  );
}
export default SideMenu;
