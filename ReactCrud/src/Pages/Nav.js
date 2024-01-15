import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Profile
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  {/* <li><hr className="dropdown-divider"></li> */}
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-disabled="true"
                  onClick={() => {
                    // Perform logout actions (clear localStorage, etc.)
                    // Then navigate to the desired route, for example, "/login"
                    localStorage.removeItem("userdata");
                    localStorage.removeItem("token");
                    // Clear token from localStorage
                    navigate("/emaillogin"); // Redirect to the login page
                  }}
                >
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to={"/changepassword"}
                  className="nav-link"
                  // aria-disabled="true"
                >
                  Channge password
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={`/profileedit/${storedUserda._id}`}
                  className="nav-link"
                  // aria-disabled="true"
                >
                  profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
