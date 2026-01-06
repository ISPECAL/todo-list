import { useState, useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodo);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="TodoTitle">Todo</label>
      <input
        ref={todoTitleInput}
        name="title"
        type="text"
        id="TodoTitle"
        value={workingTodo}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button type="submit" disabled={workingTodo === ''}>
        Add todo
      </button>
    </form>
  );
}

export default TodoForm;
