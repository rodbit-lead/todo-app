import React from 'react';
import { Flex, MantineProvider, Center, Title } from '@mantine/core';
import TodoList from './components/TodoList';
import '@mantine/core/styles.css'
import TodoForm from './components/TodoForm';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <Flex direction='column'>
        <Flex bg='blue' h={100} >
          <Title order={2} c='white' mt='xl' ml='xl'>
            Todoer
          </Title>
        </Flex>
        <TodoList />

        <Center ta='center' fw='bold' h={100}>
          Rodbit Studios
        </Center>
      </Flex>
    </MantineProvider >
  );
};

export default App;
