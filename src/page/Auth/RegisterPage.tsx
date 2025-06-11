import React, { useState } from 'react';
import { Form, Input, Button, notification, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/login-api'; // Ensure you have this API method
import img1 from '../../style/images/draw2.png'; // Path to your image

const { Content } = Layout;


const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      notification.error({
        message: "Registration Failed",
        description: "Passwords do not match",
        placement: "topRight",
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);

      notification.success({
        message: "Registration Successful",
        description: `User successfully registered: ${email}`,
        placement: "topRight",
      });

      navigate("/");
    } catch (err: any) {
      notification.error({
        message: "Registration Failed",
        description: `${err.response?.data?.error || "An error occurred"}`,
        placement: "topRight",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/ "); 
  };

  return (
    <Layout style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(45deg,rgb(255, 255, 255) 0%,rgb(7, 94, 245) 100%)' }}>
      <Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: 1200, width: '100%', padding: '20px' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img src={img1} alt="Register form illustration" style={{ maxWidth: '80%', height: 'auto' }} />
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Register</h2>
          <Form
            onFinish={handleRegister}
            layout="vertical"
            initialValues={{ email, password, confirmPassword }}
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

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
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
                Register
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
               <Button
                type="link"
                onClick={handleLoginRedirect} // Navigate to the register page
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

export default RegisterPage;
