import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const userdata = JSON.parse(localStorage.getItem("userdata"));
      const response = await axios.post(
        "http://localhost:3500/api/verify-otp",
        {
          email: userdata.email, // Access email directly from userdata
          otp,
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "OTP verified successfully"
      ) {
        toast.success("OTP verified successfully");
        navigate("/home");
        // Redirect or perform necessary actions upon successful OTP verification
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Error during OTP verification");
    }
  };

  return (
    <div>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default Otp;
