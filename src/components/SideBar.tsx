// src/components/SideBar.tsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, LogoutOutlined, UploadOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

// Define types for the props
interface SideBarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, toggleSidebar }) => {
  const items = [
    { key: '1', icon: <UserOutlined />, label: 'Users' },
    { key: '2', icon: <UploadOutlined />, label: 'Upload' },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: (
        <Link to="/">Logout</Link>  // Add Link here
      ),
    },
  ];

  return (
    <Sider width={250} theme="dark" collapsed={collapsed} style={{ height: '100vh', position: 'relative' }}>
      <div className="logo" />

      {/* Sidebar Toggle Button */}
      <Button 
        type="default" 
        onClick={toggleSidebar} 
        icon={<SwapOutlined />} 
        style={{
          position: 'absolute',  // Absolute positioning relative to the sidebar
          bottom: '20px',         // 20px from the bottom of the sidebar
          left: '50%',            // Center the button horizontally
          transform: 'translateX(-50%)', // Adjust button to be centered
          zIndex: 10,             // Ensure it is on top of other elements
        }} 
      />
      
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
};

export default SideBar;
