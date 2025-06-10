import React from 'react';
import { Spin } from 'antd';
import '../style/css/LoadingOverlay.css';  // Thêm CSS cho overlay

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <Spin size="large" />
    </div>
  );
};

export default LoadingOverlay;
