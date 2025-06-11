import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/Auth/LoginPage";  
import RegisterPage from "./page/Auth/RegisterPage";  
import HomePage from "./page/User/HomePage";  
import Error404page from "./page/templates/Error404page";
import PrivateRoute from "./components/PrivateRoute"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" 
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Error404page />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
