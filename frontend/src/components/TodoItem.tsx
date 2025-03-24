import React, { useState } from "react"
import { Modal, Button, Card, Badge, Title, Group, TextInput, Checkbox, Stack, } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTodo: { title: string, description: string, completed: boolean }) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [checked, setChecked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  const [editedDescription, setEditedDescription] = useState(todo.description)
  const [editedCompleted, setEditedCompleted] = useState(todo.completed)
  const [opened] = useDisclosure(true);

  const handleSave = () => {
    onUpdate(todo._id, {
      title: editedTitle,
      description: editedDescription,
      completed: editedCompleted
    });
    setIsEditing(false)
  }

  return (
    <Group>
      {isEditing ? (
        <Modal opened={opened} onClose={() => setIsEditing(false)} withCloseButton={false} title="Edit Todo" >
          <Stack>
            <TextInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.currentTarget.value)}
              placeholder="Title"
            />
            <TextInput
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.currentTarget.value)}
              placeholder="Description"
            />
            <Checkbox
              label="Check if it's Completed"
              checked={editedCompleted}
              onChange={(e) => setEditedCompleted(e.target.checked)}
              placeholder="Completed"
            />
            <Group>
              <Button onClick={handleSave}>Save</Button>
              <Button color="red" onClick={() => setIsEditing(false)}>Cancel</Button>
            </Group>
          </Stack>
        </Modal>
      ) : (
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Title order={3}>{todo.title}</Title>
          <p>{todo.description}</p>
          <Badge onChange={() => setChecked((v) => !v)} mb='md' size="xs" color={todo.completed ? 'green' : 'red'}>
            {todo.completed ? "Completed" : "Not Completed"}
          </Badge>
          <Group justify="space-between" >
            <Button color="green" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button color="red" onClick={() => onDelete(todo._id)}>Delete</Button>
          </Group>
        </Card>
      )}
    </Group>
  )
}

export default TodoItem;
