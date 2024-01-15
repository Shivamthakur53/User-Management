import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import photo from "../image/Photo.jpg";
import photo from "../image/photo.jpg";

const ProfilePage = () => {
  const params = useParams();
  const { id } = params;
  const [user, setuser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    // country: "",
  });
  const [editing, setEditing] = useState(false);
  const [imageEditing, setImageEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);

  const navigate = useNavigate();
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleImageEditClick = () => {
    setImageEditing(true);
  };
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:3500/api/update/${id}`, user);
      toast.success("user updated sucessfuly ", { position: "top-right" });
      navigate("/home");
      setEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("failed to update");
    }
  };
  // image upload
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      await axios.post(
        `http://localhost:3500/api/upload-image/${id}`,
        formData
      );
      toast.success("user profile image update sucessfuly");
      navigate("/home");
      setImageEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("image upload failed!");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `http://localhost:3500/api/profile/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setuser(response.data);
        } else {
          console.log("token not found in localstorage");
        }
      } catch (error) {
        console.log("error fetching data:", error);
      }
    };
    // const fetchDataAndSetUser = async () => {
    fetchData();
    // };
    // fetchDataAndSetUser();
  }, [id]);
  return (
    <>
      <div className="constainer mt-4">
        <h1 className="mb-4">Profile page</h1>
        <div>
          <p className="mb-2">
            <strong>User Name:</strong>
            {editing ? (
              <input
                type="text"
                value={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })}
                className="form-control"
              />
            ) : (
              user.username
            )}
          </p>
          <p className="mb-2">
            <strong>Full Name:</strong>
            {editing ? (
              <input
                type="text"
                value={user.name}
                onChange={(e) => setuser({ ...user, name: e.target.value })}
                className="form-control"
              />
            ) : (
              user.name
            )}
          </p>
          <p className="mb-2">
            <strong>Email:</strong>
            {editing ? (
              <input
                type="email"
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                className="form-control"
              />
            ) : (
              user.email
            )}
          </p>
          <p className="mb-2">
            <strong>Phone Number:</strong>
            {editing ? (
              <input
                type="number"
                value={user.phone}
                onChange={(e) => setuser({ ...user, phone: e.target.value })}
                className="form-control"
              />
            ) : (
              user.phone
            )}
          </p>
          {/* <p className="mb-2">
            <strong>country:</strong>
            {editing ? (
              <select
                //   type="number"
                value={user.country}
                onChange={(e) => setuser({ ...user, country: e.target.value })}
                className="form-control"
              >
                <option value="">--select--</option>
                <option value="india">india</option>
                <option value="singapore">singapore</option>
                <option value="Russia">Russia</option>
                <option value="USA">USA</option>
                <option value="Italy">Italy</option>
              </select>
            ) : (
              user.country
            )}
          </p> */}
          <div className="d-grid gap-2">
            {editing ? (
              <button
                onClick={handleSaveClick}
                className="btn btn-primary me-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="btn btn-secondary me-2"
              >
                Edit
              </button>
            )}
          </div>
          <div>
            <strong>User Profile:</strong>
            {imageEditing ? (
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
              />
            ) : (
              <img
                className="mt-4"
                src={
                  `http://localhost:3500/assets/image/${user.image}` || photo
                }
                // src={`/assets/image/${user.image}` || photo}
                alt=" profile avatar"
                style={{ width: "240px", height: "240px" }}
              />
            )}
            <button
              onClick={imageEditing ? handleImageUpload : handleImageEditClick}
              className="btn btn-primary mt-4"
            >
              {" "}
              {imageEditing ? "upload profile picture" : "Edit profile picture"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
