import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:5000/api/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return response.json();
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return id;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updates }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  });
  
  const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTodos.fulfilled, (state, action) => action.payload)
        .addCase(addTodo.fulfilled, (state, action) => {
          state.push(action.payload);
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
          return state.filter((todo) => todo._id !== action.payload);
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
          const index = state.findIndex((todo) => todo._id === action.payload._id);
          if (index !== -1) {
            state[index] = action.payload; // Update the todo in the state
          }
        });
    },
  });
  
  export default todoSlice.reducer;
  