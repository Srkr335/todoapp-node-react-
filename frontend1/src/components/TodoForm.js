import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import '../App.css';



const TodoForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTodo({ title: data.title }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('title', { required: 'Title is required' })}
        placeholder="Add a task"
      />
      {errors.title && <p className="error">{errors.title.message}</p>}
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
