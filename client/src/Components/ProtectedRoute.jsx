import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react";
import axios from "axios";
import ToDo from "./Components/ToDo.jsx";



const ProtectedRoute = () => {

  // assigns the use of the useNavigate function to a var called "nav"
  let nav = useNavigate();

  // 

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/authCheck",
    })
      .then((res) => {
        console.warn("Protected Route auth res", res);

        if (res.data.msg !== "valid token") {
          nav("/");
        }
      })
      .catch((err) => {
        console.log("useAuth err", err);
      });
  }, []);

  return (
    <>
      {console.log("Protected Route Hit")}
      <ToDo />
    </>
  );
};

export default ProtectedRoute;
