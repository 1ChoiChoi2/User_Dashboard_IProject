import React, { useState } from "react";
import UsersData from "./users.json";
import { User } from "./UserModel";
import Layout, { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import UsersTable from "./components/UsersTable";
import UsersSetting from "./components/UsersSetting";

function App() {
  const [users, setUsers] = useState<User[]>(UsersData);
  const [selectedMenu, setSelectedMenu] = useState<string>("User");

  function handleMenuChange(menuKey: string) {
    setSelectedMenu(menuKey);
  }

  return (
    <div className="App">
      <Layout className="user-dashboard__container">
        <Header className="user-dashboard__header">User Dashboard</Header>
        <Layout>
          <Sider theme="dark">
            <Menu
              className="user-dashboard__menu"
              onClick={({ key }) => handleMenuChange(key)}
            >
              <Menu.Item key="User" icon={<FaUser />}>
                Users
              </Menu.Item>
              <Menu.Item key="Setting" icon={<IoSettingsSharp />}>
                Setting
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
            {selectedMenu === "User" ? (
              <UsersTable users={users} />
            ) : (
              <UsersSetting users={users} setUsers={setUsers} />
            )}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
