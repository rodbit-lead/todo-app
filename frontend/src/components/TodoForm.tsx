import React, { useState } from "react"
import { Button, TextInput, Group, Checkbox, Flex } from "@mantine/core"
import { createTodo } from '../services/api';

interface TodoFormProps {
  onTodoCreated: () => void; // Callback to refresh the todo list
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    setIsSubmitting(true);
    try {
      await createTodo({ title, description, completed });
      setTitle('');
      setDescription('');
      setCompleted(false);
      onTodoCreated()
    } catch (err) {
      console.error("Error creating todo: ", err)
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex justify='space-between' align='flex-end' py="xl" px={30}>
        <TextInput
          label="Title"
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          w={400}
        />
        <TextInput
          label="Description"
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          w={600}
        />
        <Checkbox
          label="Completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <Button type="submit" loading={isSubmitting}>Add Todo</Button>
      </Flex>
    </form>
  );
};

export default TodoForm;
