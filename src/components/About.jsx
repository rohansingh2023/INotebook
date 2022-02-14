import React from "react";
import { Redirect, Link as h2 } from "react-router-dom";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <div class="p-4 p-md-5 mb-4 mt-3 text-white rounded bg-dark">
            <div class="col-md-6 px-0">
              <h1 class="display-4 fst-italic">Welcome to INotebook</h1>
              <p class="lead my-3">
                Welcome to INotebook. It is your notebook on the Cloud. Feel
                free to <strong>ADD</strong> whatever you like. You can also
                modify your notes by our <strong>UPDATE</strong> and{" "}
                <strong>DELETE</strong> functions. Be assured, as your notes are
                limited to you only as your account is highly{" "}
                <strong>AUTHENTICATED</strong>.
              </p>
              <p class="lead mb-0">
                <h3 class="text-white fw-bold">More Info...</h3>
              </p>
            </div>
          </div>

          <div class="accordion my-3" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Add a Note
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingOne"
              >
                <div class="accordion-body">
                  Use <strong>ADD</strong> to add a variety of notes to your{" "}
                  <strong>INotebook</strong>. Switch to our{" "}
                  <strong>Home</strong> Page to start adding useful and exciting
                  Notes.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Update a Note
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div class="accordion-body">
                  Use <strong>UPDATE</strong> function to update your existing
                  notes. On the <strong>Home</strong> Page, in our notes section
                  click the update icon to redefine your notes.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Delete a Note
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div class="accordion-body">
                  Use <strong>DELETE</strong> function to delete your existing
                  notes. Switch to <strong>Home</strong> Page and click on the
                  delete icon to delete a note.
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default About;
