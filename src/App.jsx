import { useReducer } from 'react';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer';

import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useState, useEffect } from 'react';
import TodosViewForm from './features/TodosViewForm';
import { useCallback } from 'react';
import './index.css';
import styles from './App.module.css';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);
  const { todoList, isLoading, isSaving, errorMessage } = todoState;
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}", title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) throw new Error(resp.statusText);

        const data = await resp.json();
        dispatch({
          type: todoActions.loadTodos,
          records: data.records,
        });
      } catch (error) {
        dispatch({
          type: todoActions.setLoadError,
          error,
        });
      }
    };
    fetchTodos();
  }, [encodeUrl, token]);

  async function addTodo(title) {
    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(resp.statusText);

      const { records } = await resp.json();

      dispatch({
        type: todoActions.addTodo,
        record: records[0],
      });
    } catch (error) {
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    dispatch({
      type: todoActions.updateTodo,
      editedTodo,
    });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error(resp.statusText);
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        originalTodo,
      });
    }
  }

  function completeTodo(id) {
    const todo = todoList.find((t) => t.id === id);
    if (!todo) return;
    updateTodo({
      ...todo,
      isCompleted: true,
    });
  }

  return (
    <div className={styles.appContainer}>
      <h1>My Todos</h1>
      <img
        src="/src/assets/TODO.png"
        alt="Todo logo"
        className={styles.todoImage}
      />

      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      <TodosViewForm
        sortField={sortField}
        sortDirection={sortDirection}
        onSortFieldChange={setSortField}
        onSortDirectionChange={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      {errorMessage && (
        <div className={styles.errorContainer}>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
