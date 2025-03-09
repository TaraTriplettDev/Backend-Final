import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function ToDo() {
  // Setting up the data, flag, edit, render, and todo variables to rely on useState for adjusting their values, also setting their default values
  const [data, setData] = useState();
  const [flag, setFlag] = useState(false);
  const [edit, setEdit] = useState({
    todo: "",
  });

  const [render, setRender] = useState(false);

  const [newTodo, setNewTodo] = useState({

    todo: "",

    // this sets the value of newTodo to have a Date attached
    created: Date.now(),
  });


  // sets up a reliance on useEffect to retrieve ToDos from the server through axios as the value of data, 
  // place the data in an array, and display flagged data

  useEffect(() => {
    console.log("useEffect Triggered");
  }, [data]);

  useEffect(() => {
    console.warn("useEffect Hit again");
    axios({
      method: "get",
      url: "http://localhost:3000/gettodos",
    })
      .then((res) => {
        console.log("res", res);
        // console.log("sorted", sorted)
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  }, [flag]);


  // assigns the value of the user input to a ToDo, which is added to the list of previous ToDos 

  const handleNewTodo = (e) => {
    console.log("handleNewTodo Hit", e);
    console.log("handleNewTodo Hit", e.target);
    console.log("handleNewToDo Hit", e.target.value);

    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value,
    }));
  };


  // takes the value of the user input and submits it to axios as a newToDo, toggles the flag

  const handleSubmit = (e) => {
    console.log("handleSubmit Hit", newToDo);

    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo,
    })
      .then((res) => {
        console.log("res", res);

        // setNewToDo({ todo: "" })
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  };


  // takes the value of the selected ToDo Item, sends it to the server and generates a new ToDo List without the ToDo of the matching id

  const handleDelete = (e) => {
    console.log("Delete Hit e.target.e", e.target.id);
    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`,
    })
      .then((res) => {
        console.log("res", res);
        console.log("res", res.data._id);
        setData((prev) => prev.filter((item) => item._id != res.data._id));
      })
      .catch((err) => console.log(err));
  };

  
  // determines whether or not the Editing Interface is accessible to the user

  const handleEdit = () => {
    setRender(!render);
  };

  
  // takes the value of the user input and changes the content of the selected ToDo Item to match

  const handleEditChange = (e) => {
    console.log("handleEditChange Hit", e.target.value);
    setEdit({ todo: e.target.value });
  };

  
  // submits the edited ToDo Item to the server

  const handleEditSubmit = (e) => {
    console.log("handleEdit Hit", e.target.id);
    axios({
      method: "put",
      url: `http://localhost:3000/edit/${e.target.id}`,
      data: edit,
    })
      .then((res) => {
        console.log("Edit Successful", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* {console.log("data", data)} */}
      {/* {console.log("flag", flag)} */}
      {/* {console.log("edit", edit)} */}
      {console.warn("render", render)}
      {/* {console.log("newToDo", newToDo)} */}


      {/* Takes the value of the user input and passes what is typed into the handleNewToDo function */}

      <input onChange={(e) => handleNewToDo(e)} />


      {/* Triggers the handleSubmit function */}

      <button onClick={(e) => handleSubmit(e)}>Submit</button>
      

      {/* Creates and organizes a ToDo List */}

      {data &&
        data
          .sort((a, b) => b.created - a.created)
          .map((item) => {
            return (
              <div key={item._id} style={{ marginBottom: "20px" }}>
                <div style={{ border: "2px solid red" }}>


                  {/* if render is true, displays the Editing Interface, otherwise displays the ToDo List */}

                  {render ? (
                    <div>
                      <input
                        defaultValue={item.todo || ""}
                        onChange={(e) => handleEditChange(e)}
                      ></input>

                      <button
                        id={item._id}
                        onClick={(e) => handleEditSubmit(e)}
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <p>{item.todo}</p>
                  )}

                  {/* Provides an interface to access the handleDelete and handleEdit functions on each ToDo Item */}

                  <button id={item._id} onClick={(e) => handleDelete(e)}>
                    Delete
                  </button>

                  <button id={item._id} onClick={(e) => handleEdit(e)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default ToDo;
