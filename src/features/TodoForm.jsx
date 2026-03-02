import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styled from 'styled-components';

const ButtonAddTodo = styled.button`
  background-color: rgb(30, 189, 9);
  color: white;
  border: 2px solid rgb(28, 173, 9);
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  margin: 5px;
  font-weight: bold;

  &:disabled {
    font-style: italic;
  }

  &:hover:not(:disabled) {
    background-color: rgb(28, 173, 9);
  }
`;

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

      <ButtonAddTodo type="submit" disabled={workingTodo === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </ButtonAddTodo>
    </form>
  );
}

export default TodoForm;
