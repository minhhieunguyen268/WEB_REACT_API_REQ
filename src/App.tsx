import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./page/Auth/LoginForm";  // Ensure default export
import RegisterForm from "./page/Auth/RegisterForm";  // Ensure default export
import HomePage from "./page/User/HomePage";  // Ensure default export
import Error404page from "./page/templates/Error404page";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Error404page />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
