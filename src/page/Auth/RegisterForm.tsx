import React, { useState } from "react";
import { register } from "../../api/login-api"; // Assuming you have a login API
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";
import img1 from "../../style/images/draw2.png"; // Ensure the image path is correct

import "../../style/vendor/bootstrap/css/bootstrap.min.css";
import "../../style/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../style/vendor/animate/animate.css";
import "../../style/vendor/css-hamburgers/hamburgers.min.css";
import "../../style/vendor/select2/select2.min.css";
import "../../style/css/util.css";
import "../../style/css/main.css";


const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

 
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      notification.error({
        message: "Registration Failed",
        description: "Passwords do not match",
        placement: "topRight",
      });
      return;
    }

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
              handleRegister();
            }}
          >
            <span className="login100-form-title">Create Account</span>

            <div
              className="wrap-input100 validate-input"
            >
              <input
                className="input100"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
            >
              <input
                className="input100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Confirm password is required"
            >
              <input
                className="input100"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Register
              </button>
            </div>

            

            <div className="text-center p-t-136">
              <Link to="/" className="txt2">
                Login here
                <i
                  className="fa fa-long-arrow-right m-l-5"
                ></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
