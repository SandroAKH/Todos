import React from 'react';
import TodoProvider from './context.tsx';
import './App.css'
import Todo from './Todo.tsx'
const App = () => {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
};

export default App;