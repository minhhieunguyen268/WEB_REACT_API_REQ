// src/components/SideBar.tsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, LogoutOutlined, UploadOutlined, SwapOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

// Define types for the props
interface SideBarProps {
  collapseds: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapseds, toggleSidebar }) => {
  const items = [
    { key: '1', icon: <UserOutlined />, label: 'Users' },
    { key: '2', icon: <UploadOutlined />, label: 'Upload' },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: (
        <Link to="/">Logout</Link>
      ),
    },
  ];

  return (
    <Sider width={250} theme="dark" collapsed={collapseds} 
      style={{ height: '100vh', position: 'relative' }}>

      
      <Button 
        type="default" 
        onClick={toggleSidebar} 
        icon={<SwapOutlined />} 
        style={{
          position: 'absolute',  
          bottom: '20px',         
          left: '50%',           
          transform: 'translateX(-50%)', 
          zIndex: 10,           
        }} 
      />
      
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
};

export default SideBar;
