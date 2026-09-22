// App.jsx
import { useState, useEffect } from 'react';
import TodoForm from './todoForm';
import TodoList from './todoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos';
import './todo.css';

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    const done = filter === 'all' ? undefined : filter === 'done';
    fetchTodos(done)
      .then(data => {
        if (!ignore) {
          setTodos(data);
          setError('');
          setLoading(false);
        }
      })
      .catch(err => {
        if (!ignore) {
          console.error(err);
          setError('Could not load tasks. Check that the server is running.');
          setLoading(false);
        }
      });
    return () => { ignore = true; };
  }, [filter, refresh]);

  const refreshTodos = () => {
    setLoading(true);
    setRefresh(value => value + 1);
  };

  const changeFilter = (value) => {
    if (value === filter) return;
    setLoading(true);
    setError('');
    setFilter(value);
  };

  const handleAdd = async (title) => {
    await createTodo(title);
    refreshTodos();
  };

  const handleToggle = async (id, done) => {
    await updateTodo(id, { done: !done });
    refreshTodos();
  };

  const handleRename = async (id, title) => {
    await updateTodo(id, { title });
    refreshTodos();
  };

  const handleRemove = async (id) => {
    await deleteTodo(id);
    refreshTodos();
  };

  return (
    <div className="receipt-page">
      <div className="receipt">
        <header className="receipt-header">
          <span className="stamp">Tasks</span>
          <p className="receipt-date">{today}</p>
        </header>

        <TodoForm onAdd={handleAdd} />
        <div className="todo-filters" role="group" aria-label="Filter tasks">
          <button type="button" aria-pressed={filter === 'all'} onClick={() => changeFilter('all')}>All</button>
          <button type="button" aria-pressed={filter === 'active'} onClick={() => changeFilter('active')}>Active</button>
          <button type="button" aria-pressed={filter === 'done'} onClick={() => changeFilter('done')}>Done</button>
        </div>
        {error ? <p role="alert">{error}</p> : <TodoList
          todos={todos}
          loading={loading}
          onToggle={handleToggle}
          onRename={handleRename}
          onRemove={handleRemove}
        />}
      </div>
    </div>
  );
}
