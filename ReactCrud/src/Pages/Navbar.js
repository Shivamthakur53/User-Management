import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showUsername, setShowUsername] = useState(""); //create a variable and its update function to show the login user name
  const [showNavbar, setShowNavbar] = useState(false); //this useState check that we want to activate the navbar or not when not logeddin on login and register page
  const navigate = useNavigate();
  const location = useLocation(); //Returns the current location object, which represents the current URL in web browsers.
  //use the useEffect to run the function one time only
  // useEffect(() => {
  //   // this check if the current location matches login and register path or not
  //   if (location.pathname === "/login" || location.pathname === "/register") {
  //     setShowNavbar(false);
  //   } else {
  //     setShowNavbar(true);
  //     let username = sessionStorage.getItem("username"); //use the sessionStroge to get the current login user id
  //     if (username === "" || username === null) {
  //       navigate("/login");
  //     } else {
  //       setShowUsername(username); //updating the username from logged in user
  //     }
  //   }
  // }, [navigate, location]); //pass location here because we need to update the location
  return (
    <div>
      {/* and use the option chaning and operator to check the user is loggedin or not */}
      {showNavbar && (
        <div className="header">
          <Link to={"/"}>Home</Link>
          <Link to={"/customer"}>Customer</Link>
          <span style={{ marginLeft: "80%" }}>
            Welcome <strong>{showUsername}</strong>{" "}
          </span>
          {/*  showing the loggedin user username in the navbar afterloggedin */}
          <Link to={"/login"} style={{ float: "right" }}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
