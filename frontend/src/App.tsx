import React from 'react';
import { Flex, MantineProvider, Center, Title } from '@mantine/core';
import TodoList from './components/TodoList';
import '@mantine/core/styles.css'
import TodoForm from './components/TodoForm';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <Flex direction='column'>
        <Center bg='blue' w='100%' h={100} ta='center' >
          <Title order={1} c='white'>
            Todoer
          </Title>
        </Center>
        <TodoForm />
        <TodoList />

        <Center ta='center' fw='bold' h={100}>
          Rodbit Studios
        </Center>
      </Flex>
    </MantineProvider >
  );
};

export default App;
