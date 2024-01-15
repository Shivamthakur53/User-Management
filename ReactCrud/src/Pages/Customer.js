import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Navbar from "./Navbar";

const Customer = () => {
  const [showCustomerList, setShowCustomerList] = useState([]);
  const [haveEdit, setHaveEdit] = useState(false);
  const [haveView, setHaveView] = useState(false);
  const [haveAdd, setHaveAdd] = useState(false);
  const [haveRemove, setHaveRemove] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    GetUserAccess();
    loadCustomer();
    console.log(haveView);
    //if haveView become true than only we can see the data of the customer otherwise we get the warning
  }, []);
  const loadCustomer = () => {
    fetch("http://localhost:3001/customer")
      .then((res) => {
        //checking the response from the api if respose is not ok return false
        if (!res.ok) {
          return false;
        }
        //if true return the response in json format
        return res.json();
      })
      //data than come we updating here
      .then((res) => {
        setShowCustomerList(res);
      });
  };
  const GetUserAccess = () => {
    //we will check the role dynamically
    //getting the userrole from the sessionStroge and checking it is null or not
    //if it is not null get the userrole and convert it from the array to string with the help of toString method
    // if it is null than return the empty string('')
    const userrole =
      sessionStorage.getItem("userrole") != null
        ? sessionStorage.getItem("userrole").toString()
        : "";
    //http://localhost:3001/roleaccess This is the main address or endpoint where the HTTP request is directed. In this case, it points to a resource or service related to role access.
    //role= +userrole: This is a query parameter that indicates the role being queried or specified as "dynamic userrole" The value assigned to the role parameter is "dynamic form the locaal json server," suggesting that the request is related to the role of an administrator.
    //menu=customer: This is another query parameter that specifies the menu being queried or targeted as "customer." The value assigned to the menu parameter is "customer," indicating that the request is related to menu access for the "customer" section.
    //When a client makes an HTTP request to the URL "http://localhost:3001/roleaccess?role="+userrole+"&menu=customer", it is essentially asking the server at localhost:3001 for information related to role access, specifically targeting the role of "admin" and the menu labeled "customer."
    fetch(
      "http://localhost:3001/roleaccess?role=" + userrole + "&menu=customer"
    )
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          navigate("/");
          toast.warning("You are not authorized to access");
          return false;
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.length > 0) {
          //if we have the data we can view it we can edit it we can delete it we can add it
          setHaveView(true);
          let userobj = res[0];
          setHaveEdit(userobj.haveEdit);
          setHaveAdd(userobj.haveAdd);
          setHaveRemove(userobj.haveRemove);
        } else {
          navigate("/");
          toast.warning("You are not authorized to access");
        }
      });
  };
  //these all are dummy function does not do anything just show toast messages
  const handleAdd = () => {
    if (haveAdd) {
      toast.success("added");
    } else {
      toast.warning("You are not having access to Add");
    }
  };
  const handleEdit = () => {
    if (haveEdit) {
      toast.success("Edit");
    } else {
      toast.warning("You are not having access to Edit");
    }
  };
  const handleRemove = () => {
    if (haveRemove) {
      toast.success("Remove");
    } else {
      toast.warning("You are not having access to Remove");
    }
  };
  return (
    <div className="container">
      {/* <Navbar></Navbar> */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h1>Coustomer Listing</h1>
        </div>
        <div className="card-body">
          <button onClick={handleAdd} className="btn btn-success">
            Add User(+)
          </button>
          <br />
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* check condion tha tdata is there then show it in the table */}
              {showCustomerList &&
                showCustomerList.map((item) => (
                  <tr key={item.code}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button onClick={handleEdit} className="btn btn-primary">
                        Edit
                      </button>{" "}
                      |
                      <button onClick={handleRemove} className="btn btn-danger">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
