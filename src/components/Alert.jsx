import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Alert = () => {
  const { alert } = useContext(noteContext);

  const capitalize = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    const lower = word?.toString().toLowerCase();
    return lower?.charAt(0).toUpperCase() + lower?.slice(1);
  };

  return (
    <div>
      {alert ? (
        <div
          className={`alert alert-${alert.type} alert dismissable fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type).toString()}</strong>: {alert.msg}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Alert;
