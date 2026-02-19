import React from "react";
import DeleteButton from "../DeleteButton/DeleteButton";
import "./ListItem.css";

function ListItem({ number, text, onDelete }) {
  return (
    <div className="list-item">
      <span className="item-number">{number}.</span>
      <p className="item-text">{text}</p>
      <DeleteButton onClick={onDelete} />
    </div>
  );
}

export default ListItem;
