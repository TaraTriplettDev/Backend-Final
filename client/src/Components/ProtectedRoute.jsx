// import React, { useEffect } from "react";
// import { Outlet, useNavigate } from "react-router";
// import axios from "axios";
// import LoggedIn from "../LoggedIn";

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react";
import axios from "axios";
import LoggedIn from "../LoggedIn";

// This Protected Route requires that the res being pulled by the Login has a 
// valid token 

const ProtectedRoute = () => {
  let nav = useNavigate();

  useEffect(() => {
    // axios.defaults.withCredentials = true;
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3000/authCheck",
    })
      .then((res) => {
        console.warn("Protected Route with auth res", res);
        if (res.data.msg !== "valid token") {
          nav("/");
        }
      });
  }, []);

  return (
    <>
      {console.log("Protected Route Hit ")}
      <LoggedIn />
    </>
  );
};

export default ProtectedRoute;