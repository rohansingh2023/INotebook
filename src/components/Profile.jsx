import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Footer from "./Footer";

const Profile = () => {
  const { user } = useContext(noteContext);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <div class="card text-center my-5">
            <div class="card-header">UserName</div>
            <div class="card-body">
              <h5 class="card-title">{user ? user.name : "Username"}</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/about" class="btn btn-primary">
                Go to About
              </Link>
            </div>
            <div class="card-footer text-muted">2 days ago</div>
          </div>
          <div className="card text-center my-5">
            <div className="card-header my-3">E-Mail</div>
            <div className="card-body">
              <h5 className="card-title my-3 h1">
                {localStorage.getItem("token") ? user.email : "E-Mail"}
              </h5>
              <p className="card-text my-3">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <Link to="/" className="btn btn-primary my-4">
                Back to Home
              </Link>
            </div>
            <div className="card-footer text-muted">2 days ago</div>
          </div>
          <Footer />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default Profile;
