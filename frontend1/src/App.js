import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => (
  <div>
    <h1>Todo App</h1>
    <TodoForm />
    <TodoList />
  </div>
);

export default App;
