import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoggedIn from "../../LoggedIn";

const ProtectedRoute = () => {
  let nav = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
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
        console.log("useAuth error", err);
      });
  }, []);

  return (
    <>
      {console.log("Protected Route hit ")}
      <LoggedIn />
    </>
  );
};

export default ProtectedRoute;
