import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //  useEffect(() => {
  //      sessionStorage.clear(); //user the clear method of sessionStorage to clear the storage which has the logedin id
  //    }, []);
  //    const handleLogin = (e) => {
  //      e.preventDefault();
  //      if (isValidate()) {
  //        console.log("proceed");
  //        axios.post(
  //          "/api/login",
  //          { username, password },
  //          {
  //          }
  //        )
  //          .then((res) => {
  //            return res.json();
  //          })
  //          .then((resp) => {
  //            console.log(resp);
  //            //checking if we try to loggedin without entering the username and password show this error
  //            if (Object.keys(resp).length === 0) {
  //              toast.error("Please Enter Valid Username");
  //            } else {
  //              //checking the stored password and enterd password is same or not
  //              if (resp.password === password) {
  //                toast.success("Success");
  //                // seting the sessionStorage value to username from which we try to loggedin and navigate to home page
  //                // sessionStorage.setItem("username", username);
  //                //we are also sending the userrole in the sessionStorage to check where its a admin or not that loggedin
  //                // sessionStorage.setItem("userrole", resp.role);
  //                navigate("/");
  //              } else {
  //                toast.error("Please Enter Valid Credentials");
  //              }
  //            }
  //          })
  //          .catch((err) => {
  //            toast.error("Login failed due to: " + err.message);
  //          });
  //      }
  //    }; */

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3500/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/home");
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
  const isValidate = () => {
    let isproceed = true;
    let errorMessage = "Please enter the value in ";
    if (username === null || username === "") {
      isproceed = false;
      errorMessage += " Username";
    }
    if (password === null || password === "") {
      isproceed = false;
      errorMessage += " Password";
    }
    if (!isproceed) {
      toast.warning(errorMessage);
    }
    return isproceed;
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form action="" onSubmit={handleLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">
                  Username <span className="errmsg">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <Link className="btn btn-success" to={"/emaillogin"}>
                Login with Email
              </Link>
              <Link className="btn btn-success" to={"/changepassword"}>
                change Password
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
