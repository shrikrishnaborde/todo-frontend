import React from "react";
import "./TodoHeader.css";

function TodoHeader({ title = "To Do List" }) {
  return <h1 className="todo-heading">{title}</h1>;
}

export default TodoHeader;
