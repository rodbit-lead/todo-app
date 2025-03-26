import { Request, Response } from 'express'
import Todo from '../models/Todo';

// Get all todos
const getTodos = async (req: Request, res: Response) => {
  const { page = 1, limit = 5, search = '' } = req.query;
  try {
    let query: any = {
      $or: [
        { title: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } },
      ],
    };

    if (req.query.filter === 'completed') query.completed = true;
    if (req.query.filter === 'not-completed') query.completed = false;

    const sortOptions: any = {};
    if (req.query.sortBy === 'title') sortOptions.title = 1;
    if (req.query.sortBy === 'createdAt') sortOptions.createdAt = -1;

    const todos = await Todo.find(query).sort(sortOptions).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));

    const total = await Todo.countDocuments(query);

    res.status(200).json({
      todos,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
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
