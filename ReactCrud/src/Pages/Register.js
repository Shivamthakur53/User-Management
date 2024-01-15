import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState(""); //useState Returns a stateful value, and a function to update it.
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  // const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const navigate = useNavigate(); //It is used to change the location when the user is register successfully

  //Validation Arrow Function
  const isValidate = () => {
    let isproceed = true;
    let errorMessage = "Please enter the value in ";
    if (username === null || username === "") {
      isproceed = false;
      errorMessage += " Username";
    }
    if (name === null || name === "") {
      isproceed = false;
      errorMessage += " FullName";
    }
    if (password === null || password === "") {
      isproceed = false;
      errorMessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errorMessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid Email");
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let registerData = {
      username,
      name,
      password,
      email,
      phone,
      country,
      // address,
      gender,
    };
    if (isValidate()) {
      // console.log(registerData);
      //adding the created user to our json-server db.json file by using fetch
      axios
        .post("http://localhost:3500/api/create", registerData, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username,
            name,
            password,
            email,
            phone,
            country,
            // address,
            gender,
          }),
        })
        //this run when all the  data is correct and unique
        .then((res) => {
          toast.success("Registered Successfull");
          navigate("/");
        }) //this will run when data is not field of validation error
        .catch((err) => {
          toast.error("Faild: " + err.message);
        });
    }
  };

  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form action="" className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">
                      User Name <span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Full Name <span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      //   type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">
                      Country <span className="errmsg">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="singapore">Singapore</option>
                      <option value="russia">Russia</option>
                      <option value="france">France</option>
                      <option value="italy">Italy</option>
                    </select>
                  </div>
                </div>
                {/* <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="">Address</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div> */}
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="">Gender</label>
                    <br />
                    <input
                      type="radio"
                      name="gender"
                      id=""
                      value="male"
                      className="app-check"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      id=""
                      value="female"
                      className="app-check"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      id=""
                      value="other"
                      className="app-check"
                      checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="">Other</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" type="submit">
                Register
              </button>{" "}
              |
              <a href="/" className="btn btn-danger">
                Back
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
