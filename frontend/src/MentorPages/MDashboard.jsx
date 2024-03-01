import React, { useEffect, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Layout, Button, theme } from "antd";
import Logoimg from "../MNavbar/MLogoimg";
import MenuItem from "../MNavbar/MMenuItem";
import { FaRegCheckCircle } from "react-icons/fa";
import ToggleButton from "../MNavbar/MToggle";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { GrProjects } from "react-icons/gr";
import { viewgroups, viewprojects } from "../MentorAuth/Services/Api";
const { Header, Sider, Content } = Layout;

const MDashboard = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [groupdata, setviewgroupdata] = useState(null);
  const [projectdata, setprojectdata] = useState(null);
  const [phasestatus, setphasestatus] = useState(null);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    console.log(1231);
    const fetchgroups = async () => {
      try {
        const data = await viewgroups();
        console.log(data);
        setviewgroupdata(data);
      } catch (error) {}
    };
    fetchgroups();
    const fetchproject = async () => {
      try {
        const data = await viewprojects();

        setprojectdata(data);
        if (data && data.userData && data.userData.length > 0) {
          const completeProjectsCount = data.userData.filter(
            (project) => project.Phase_Status === "uploaded"
          ).length;

          setphasestatus(completeProjectsCount);
        } else {
          console.log("No data fetched or data is empty.");
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    fetchproject();
  }, []);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "dark" : "light"}
        className=""
      >
        <Logoimg />
        <MenuItem darkTheme={darkTheme} />
        <ToggleButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
        </Header>
        <Content>
          <div className="flex justify-around gap-4">
            <div className="w-fit h-12 bg-purple-800 m-4 rounded-xl flex items-center  relative px-5 shadow-lg shadow-slate-500">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <GrProjects className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                No.Of Projects : {projectdata && projectdata.userData.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-orange-800 m-4 rounded-xl flex items-center  relative px-5 shadow-lg shadow-slate-500">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <FaRegCheckCircle className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-balance text-white ">
                Phase Status : {phasestatus}
                {"/"}
                {projectdata && projectdata.userData.length}
              </div>
            </div>
            <div className="w-fit h-12 bg-blue-800 m-4 rounded-xl flex items-center px-5 shadow-lg shadow-slate-500">
              <div className="w-8 h-8 bg-gray-100 rounded-full relative">
                <MdOutlineGroupAdd className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="ml-4 text-base text-white">
                No Of Students : {groupdata && groupdata.userData.length}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MDashboard;
