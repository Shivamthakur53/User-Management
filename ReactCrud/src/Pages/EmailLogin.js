import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Email = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3500/api/emaillogin",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        const userdata = response.data;
        const userdataString = JSON.stringify(userdata);
        localStorage.setItem("userdata", userdataString);
        localStorage.setItem("token", token);

        navigate("/otp");
        toast.success("successsssssssss");
      } else {
        console.error("fail");
        toast.error("faillllllll");
      }
    } catch (error) {
      console.log("error", error.message);
      toast.error("error", error.message);
    }
  };
  // const isValidate = () => {
  //   let isproceed = true;
  //   let errorMessage = "Please enter the value in ";
  //   if (email === null || email === "") {
  //     isproceed = false;
  //     errorMessage += " Username";
  //   }
  //   if (password === null || password === "") {
  //     isproceed = false;
  //     errorMessage += " Password";
  //   }
  //   if (!isproceed) {
  //     toast.warning(errorMessage);
  //   }
  //   return isproceed;
  // };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form action="" className="container" onSubmit={handleLogin}>
          <div className="card">
            <div className="card-header">
              <h2>Email</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">
                  UserEmail <span className="errmsg">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{" "}
              |
              <Link className="btn btn-success" to={"/register"}>
                New User
              </Link>
              <Link className="btn btn-success" to={"/Otp"}>
                Forgot Password
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
