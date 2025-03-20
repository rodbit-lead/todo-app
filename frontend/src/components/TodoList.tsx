import React, { useEffect, useState } from 'react';
import { Title, Flex, Group } from '@mantine/core';
import { getTodos, deleteTodo, updateTodo } from '../services/api';
import TodoItem from './TodoItem.tsx';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

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

  return (
    <Flex align="center" direction='column'>
      <Title order={2} my='xl'>Your Todo List</Title>
      <Group gap='lg'>
        {todos.map((todo: any) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Group>
    </Flex>
  )
};

export default TodoList;
