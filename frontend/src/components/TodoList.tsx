import React, { useEffect, useState } from 'react';
import { Title, Flex, Group, Select } from '@mantine/core';
import { getTodos, deleteTodo, updateTodo } from '../services/api';
import TodoItem from './TodoItem.tsx';
import TodoForm from './TodoForm.tsx';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'not-completed'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('createdAt');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data)
    } catch (err) {
      console.error("Error fetching todos: ", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos() // is used to refresh the list after delition
    } catch (err) {
      console.error("Error deleting todo: ", err)
    }
  };

  const handleUpdate = async (id: string, updatedTodo: { title: string, description: string, completed: boolean }) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo: ", err)
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'not-completed') return !todo.completed;
    return true; // all
  });

  const sortedAndFilteredTodos = filteredTodos.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  })

  return (
    <Flex justify="space-between" direction='column' bg="#f1f1f1" py='xl' px={30}>
      <Group justify='space-between' >
        <Title order={2}>Your Todo List</Title>
        <Select
          label="Filter by"
          value={filter}
          onChange={(value) => setFilter(value as 'all' | 'completed' | 'not-completed')}
          data={[
            { value: 'all', label: 'All' },
            { value: 'completed', label: 'Completed' },
            { value: 'not-completed', label: 'Not Completed' },
          ]}
        />
        <Select
          label="Sort by"
          value={sortBy}
          onChange={(value) => setSortBy(value as 'createdAt' | 'title')}
          data={[
            { value: 'createdAt', label: 'Creation Date' },
            { value: 'title', label: 'Title' },
          ]}
        />
      </Group>
      <TodoForm onTodoCreated={fetchTodos} />
      <Flex justify="space-between">
        {filteredTodos.map((todo: any) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Flex>
    </Flex>
  )
};

export default TodoList;
