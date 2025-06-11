import React, { useState } from 'react';
import { Form, Input, Button, notification, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/login-api';
import img1 from '../../style/images/draw2.png'; 

const { Content } = Layout;

interface LoginResponse {
  token: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result: LoginResponse = await login(email, password);
      localStorage.setItem("token", result.token);
      navigate("/home");
      notification.success({
        message: "Login Success",
        description: "Login successfully!",
        placement: "topRight",
      });
    } catch (err: any) {
      notification.error({
        message: "Login Failed",
        description: `${err.response?.data?.error || "An error occurred"}`,
        placement: "topRight",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Navigates to the register page
  };

  return (
    <Layout style={{ height: '100vh', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', 
    background: 'linear-gradient(45deg,rgb(255, 255, 255) 0%,rgb(7, 94, 245) 100%)' }}>
      <Content style={{ display: 'flex', flexDirection: 'row', 
        justifyContent: 'center', alignItems: 'center', 
        maxWidth: 1200, width: '100%', padding: '20px' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src={img1} alt="Login form illustration" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center',  marginTop: '50px' }}>Login</h2>
          <Form
            onFinish={handleLogin}
            layout="vertical"
            initialValues={{ email, password }}
            style={{ padding: '70px 70px 0px 70px' }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please input a valid email!' }]}
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ borderRadius: '5px' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
                style={{ borderRadius: '5px' }}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="link"
                onClick={handleRegisterRedirect} // Navigate to the register page
                style={{ padding: 0, marginTop: '10px' }}
              >
                Create an Account
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
