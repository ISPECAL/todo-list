import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';

function TodoForm({ onAddTodo, isSaving }) {
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
      <TextInputWithLabel
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        elementId="todoTitle"
        labelText="Todo"
      />

      <button type="submit" disabled={workingTodo === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
