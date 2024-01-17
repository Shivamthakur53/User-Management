import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "./Pages/Home";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Customer from "./Pages/Customer";
import Register from "./Pages/Register";
import Otp from "./Pages/Otp";

import EmailLogin from "./Pages/EmailLogin";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./Pages/ChangePassword";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Pages/Navbar";

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      {/* <Home /> */}
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/emaillogin" element={<EmailLogin />}></Route>
          <Route path="/Otp" element={<Otp />}></Route>
          <Route path="/changepassword" element={<ChangePassword />}></Route>
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/profileedit/:id" element={<ProfilePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
