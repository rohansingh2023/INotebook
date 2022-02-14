import React, { useContext } from "react";
import Notes from "./Notes";
import noteContext from "../context/notes/noteContext";
import Footer from "./Footer";

const Home = () => {
  const { showAlert } = useContext(noteContext);

  return (
    <div>
      <Notes showAlert={showAlert} />
      <Footer />
    </div>
  );
};

export default Home;
