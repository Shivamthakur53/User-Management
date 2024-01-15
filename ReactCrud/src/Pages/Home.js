import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react";
const Home = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({}); // Update this state based on your form or user inputs

  const userdata = localStorage.getItem("userdata");
  const storedUserda = JSON.parse(userdata);
  console.log(storedUserda._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const handleUpdate = async (id, updatedData) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:3500/api/${id}`,
  //       updatedData
  //     );
  //     if (response.status === 200) {
  //       const updatedList = data.map((item) => {
  //         if (item._id === id) {
  //           return { ...item, ...updatedData };
  //         }
  //         return item;
  //       });
  //       setData(updatedList);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3500/api/delete/${id}`
      );

      if (response.status === 200) {
        // Handle successful deletion, if needed
        const updatedList = data.filter((item) => item._id !== id);
        setData(updatedList);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // searching
  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3500/api?search=${searchQuery}`
  //     );
  //     setFilteredData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
      <div className="mt-5">
        <div>
          <h2>Data List</h2>
          <table>
            <thead>
              <tr>
                <th>username</th>
                <th>email</th>
                <th>phone</th>
                {/* Add more headers as per your schema */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  {/* <button onClick={() => handleUpdate(item._id)}>Update</button> */}
                  {/* Add more table cells based on your schema */}
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
