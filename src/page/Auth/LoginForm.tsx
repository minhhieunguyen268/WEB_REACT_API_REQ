import React, { useState, useEffect } from "react";
import { login } from "../../api/login-api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { notification } from "antd";
import img1 from "../../style/images/draw2.png";

import "../../style/vendor/bootstrap/css/bootstrap.min.css";
import "../../style/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../style/vendor/animate/animate.css";
import "../../style/vendor/css-hamburgers/hamburgers.min.css";
import "../../style/vendor/select2/select2.min.css";
import "../../style/css/util.css";
import "../../style/css/main.css";

interface LoginResponse {
  token: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    localStorage.removeItem("token");
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get("email");
    const passFromQuery = params.get("pass");
    if (emailFromQuery && passFromQuery) {
      setEmail(emailFromQuery);
      setPassword(passFromQuery);
    }
  }, [location]);

  const handleLogin = async () => {
    try {
      setError(null);
      const result: LoginResponse = await login(email, password);
      localStorage.setItem("token", result.token);
      console.log("Login successful:", result);
      navigate("/home"); // Navigate to home after successful login
    } catch (err: any) {
      notification.error({
        message: "Login Failed",
        description: `${err.response?.data?.error || "An error occurred"}`,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={img1} alt="Login form illustration" />
          </div>

          <form
            className="login100-form validate-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <span className="login100-form-title">Member Login</span>

            {error && (
              <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
            )}

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="username"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot </span>
              <button className="txt2" type="button">
                Username / Password?
              </button>
            </div>

            <div className="text-center p-t-136">
              <Link to="/register" className="txt2">
                Create your Account
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
