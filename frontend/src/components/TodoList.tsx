import React, { useEffect, useState } from 'react';
import { Title, Text, Flex, Group, Select, Pagination, TextInput, LoadingOverlay, Alert, Center } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import TodoItem from './TodoItem.tsx';
import TodoForm from './TodoForm.tsx';
import axios from 'axios';

interface TodoProps {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'not-completed'>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('createdAt');
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSeachTerm] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(searchTerm, 500);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get
          (`/api/todos`, {
            params: {
              page: currentPage,
              limit: 5,
              search: debouncedSearch,
              filter,
              sortBy
            },
            withCredentials: true
          });

        if (!response.data?.todos) {
          throw new Error('No todos array in response');
        }

        setTodos(response.data.todos);
        setTotalPages(response.data.totalPages)
      } catch (err: any) {
        console.error("Error fetching todos:", err)
        setError(err.response?.data?.message || err.message || 'Failed to load todos');
      } finally {
        setLoading(false)
      }
    };

    fetchTodos();
  }, [debouncedSearch, currentPage, filter, sortBy]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/todos/${id}`)

      setTodos(prev => prev.filter(todo => todo._id !== id))

      if (todos.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setError('Failed to delete todo')
      console.error("Error deleting todo: ", err)
    }
  };

  const handleUpdate = async (id: string, updatedTodo: Partial<TodoProps>) => {
    try {
      const response = await axios.put(`/api/todos/${id}`, updatedTodo);
      setTodos(prev => prev.map(todo =>
        todo._id === id ? { ...todo, ...response.data } : todo
      ));
    } catch (err) {
      setError("Failed to update todo")
      console.error("Error updating todo: ", err)
    }
  }

  return (
    <Flex justify="space-between" direction='column' bg="#f1f1f1" py='xl' px={30}>

      <Group justify='space-between' >
        <Title order={2}>Your Todo List</Title>
        <TextInput
          label='Search'
          placeholder='Search todos...'
          value={searchTerm}
          onChange={(e) => {
            setSeachTerm(e.target.value);
            setCurrentPage(1);
          }}
          w='50%'
        />
        <Select
          label="Filter by"
          value={filter}
          onChange={(value) => { setFilter(value as 'all' | 'completed' | 'not-completed'); setCurrentPage(1) }}
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

      <TodoForm onTodoCreated={() => {
        setCurrentPage(1);
        setFilter(prev => prev);
      }} />

      {loading ? (
        <Text>Loading todos...</Text>
      ) : error ? (
        <Alert color='red'>{error}</Alert>
      ) : todos.length > 0 ? (

        <Flex wrap='wrap' gap='md' justify='space-between'>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </Flex>
      ) : (
        <Text>No todos found. Create one to get started</Text>
      )}

      {totalPages > 1 && (
        <Center mt='xl'>
          <Pagination total={totalPages} onChange={setCurrentPage} value={currentPage} />
        </Center>
      )}
    </Flex>
  );
};

export default TodoList;
