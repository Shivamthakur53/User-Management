import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  //   const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userdata = JSON.parse(localStorage.getItem("userdata"));
      const response = await axios.post(
        "http://localhost:3500/api/change-password",
        {
          email: userdata.email,
          username: userdata.username,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userdata.token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("password changed sucessfully");
      navigate("/home");
    } catch (error) {
      console.error("error changing passsoword;", error);
      toast.error("error changing password.please try again");
    }
  };
  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="card-header">
          <h2>change password</h2>
        </div>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="form-control"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
