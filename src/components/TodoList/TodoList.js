import React from "react";
import ListItem from "../ListItem/ListItem";
import "./TodoList.css";

function TodoList({ tasks, onDelete }) {
  return (
    <div className="todo-list">
      {tasks.map((task, index) => (
        <ListItem
          key={task.id}
          number={index + 1}
          text={task.title}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}

export default TodoList;
