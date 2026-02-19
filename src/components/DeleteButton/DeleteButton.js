import React from "react";
import "./DeleteButton.css";

function DeleteButton({ onClick, label = "[Delete]" }) {
  return (
    <button className="delete-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default DeleteButton;
