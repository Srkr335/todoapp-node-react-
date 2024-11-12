import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, updateTodo } from '../features/todoSlice'; 
import '../App.css';





const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [isEditing, setIsEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleUpdate = (id, updates) => {
    dispatch(updateTodo({ id, updates }));
    setIsEditing(null);
    setEditValue('');
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {isEditing === todo._id ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo._id, { title: editValue })}>Save</button>
              <button onClick={() => setIsEditing(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <button onClick={() => setIsEditing(todo._id)}>Edit</button>
              <button onClick={() => handleUpdate(todo._id, { completed: !todo.completed })}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
