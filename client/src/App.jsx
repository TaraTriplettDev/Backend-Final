import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });

  const nav = useNavigate();

  // handleLogin takes the value of e and sets the value of login to the previous state, the e id, and the e value* 

  const handleLogin = (e) => {
    console.log("login", e.target.value);
    setLogin((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  // handleLoginSubmit takes the value of login and passes it to the server through axios

  const handleLoginSubmit = () => {
    console.log(login);
    axios({
      method: "post",
      url: "http://localhost:3000/api/login",
      data: login,
      withCredentials: true,
    })
      .then((res) => {
        console.log("res", res.data);

        if (res.data.msg === "Good Login") {
          nav("/admin");
        } else {
          alert("Bad Login");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = (e) => {
    console.log("reg", register);
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    console.log("reg", register);
    axios({
      method: "post",
      url: "http://localhost:3000/api/register",
      data: register,
    })
      .then((res) => console.log("res", res.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      { /* Setting up login inputs */ }

      <div id="login">
        {console.log("login", login)}
        {console.log("reg", register)}
        <h1>Login</h1>
        {/* The onChange segment takes the e(vent) and passes it to handleLogin */} 
        <input 
          id="username"
          onChange={(e) => handleLogin(e)} 
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleLogin(e)}
          type="text"
          placeholder="Password"
        />
        <br />
        <br />

        {/* calling a function to submit the data in handleLogin */}
        <button onClick={() => handleLoginSubmit()}>Login</button>
        
        </div>
        <br />
        <br />
        <hr />
        <br />
        <br />

        {/* Setting up register inputs */}

        <div id="register">
          <h1>Register</h1>
          <input
            id="username"
            onChange={(e) => handleRegister(e)}
            type="text"
            placeholder="Username"
          />
          <br />
          <br />
          <input
            id="password"
            onChange={(e) => handleRegister(e)}
            type="text"
            placeholder="Password"
          />
          <br />
          <br />
          <button onClick={() => handleRegisterSubmit()}>Register</button>
          </div>
        </>
  );
}

export default App
