const API_BASE =
  process.env.REACT_APP_API_BASE ||
  "http://ec2-15-134-209-81.ap-southeast-2.compute.amazonaws.com:8080/api";

async function handleResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    let errorText = `${res.status} ${res.statusText}`;
    try {
      if (contentType.includes("application/json")) {
        const json = await res.json();
        errorText = json.message || JSON.stringify(json);
      } else {
        errorText = await res.text();
      }
    } catch (e) {
      /* ignore */
    }
    throw new Error(errorText);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}

async function fetchTodos() {
  const res = await fetch(`${API_BASE}/todos`);
  return handleResponse(res);
}

async function addTodo(payload) {
  const res = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: "DELETE",
  });
  // some backends return nothing, handleResponse will return null in that case
  return handleResponse(res);
}

const todoService = {
  API_BASE,
  fetchTodos,
  addTodo,
  deleteTodo,
};

export default todoService;
