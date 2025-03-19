import axios from "axios";

const API_URL = 'http://localhost:5000/api/todos';

// Fetch all todos
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new todo
export const createTodo = async (todo: { title: string, description: string, completed: boolean }) => {
  const response = await axios.post(API_URL, todo)
  return response.data;
}

// Update a todo
export const updateTodo = async (id: string, todo: { title: string, description: string, completed: boolean }) => {
  const response = await axios.put(`${API_URL}/${id}`, todo)
  return response.data;
}

// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data;
}
