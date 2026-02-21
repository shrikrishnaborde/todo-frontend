import React, { useState, useEffect } from "react";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoList from "../TodoList/TodoList";
import todoService from "../../services/todoService";
import "./TodoApp.css";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    todoService
      .fetchTodos()
      .then((data) => {
        if (!mounted) return;
        // Expect backend to return array of { id, text }
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Failed to fetch todos:", err);
        setError(err.message || "Failed to fetch todos");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const deleteTask = async (id) => {
    // optimistic update
    const prev = tasks;
    setTasks((t) => t.filter((task) => task.id !== id));
    try {
      await todoService.deleteTodo(id);
    } catch (err) {
      console.error("Delete failed, reverting", err);
      setTasks(prev);
      setError(err.message || "Delete failed");
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-content">
        <TodoHeader title="To Do List" />
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && <TodoList tasks={tasks} onDelete={deleteTask} />}
      </div>
    </div>
  );
}

export default TodoApp;
