import React, { useState } from "react";
import NoteContext from "./noteContext";

const url = "http://localhost:5000";

const NoteState = ({ children }) => {
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState("");
  const [user, setUser] = useState([{}]);

  //Alert
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  //Register
  const Signup = async (name, email, password) => {
    const response = await fetch(`${url}/api/auth/createuser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json.decode);
    setUser(json.decode);
    //Save the authtoken and Redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("user", json.decode.user);
      showAlert("Account created successfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  //Login
  const Login = async (email, password) => {
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json.decode.user);
    setUser(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("user", json.decode.user);
      showAlert("Logged In successfully", "success");
    } else {
      showAlert("Invalid Credentials", "danger");
    }
  };

  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${url}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id }),
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    console.log("Deleting the note with id" + id);
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        alert,
        showAlert,
        user,
        Login,
        Signup,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
