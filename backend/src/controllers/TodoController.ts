import { Request, Response } from 'express'
import Todo from '../models/Todo';

// Get all todos
const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find()
    res.status(200).json(todos)
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

// Create a Todo
const createTodo = async (req: Request, res: Response) => {
  const { title, description, completed } = req.body
  try {
    const todo = new Todo({ title, description, completed })
    await todo.save()
    res.status(201).json(todo)
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching todos", err })
  }
};

// Update a Todo
const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  try {
    const todo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true })
    if (!todo) {
      res.status(404).json({ message: "Todo not found" })
    }
    res.json(todo)
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
};

// Delete a Todo
const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      res.status(404).json({ message: "Todo not found" })
    }
    res.json({ message: "Todo deleted successfully" })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo }
