import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="TodoTitle">Todo</label>
      <input ref={todoTitleInput} name="title" type="text" id="TodoTitle" />
      <button type="submit">Add todo</button>
    </form>
  );
}

export default TodoForm;
