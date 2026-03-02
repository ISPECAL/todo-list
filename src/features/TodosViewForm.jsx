import { useState, useEffect } from 'react';
import styled from 'styled-components';
const InputSearch = styled.input`
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #0533af;
  border-radius: 4px;
  margin-bottom: 2rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

function TodosViewForm({
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  useEffect(() => {
    setLocalQueryString(queryString);
  }, [queryString]);
  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <form>
      <div>
        <label>
          Search todos:
          <InputSearch
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
        </label>
        <button
          className="buttonClear"
          type="button"
          onClick={() => setLocalQueryString('')}
        >
          Clear
        </button>
      </div>
      <div>
        <label className="labelTemplate">
          Sort by:
          <select
            className="selectTemplate"
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
          >
            <option value="createdTime">Created Time</option>
            <option value="title">Title</option>
          </select>
        </label>
        <label className="labelTemplate">
          Direction:
          <select
            className="selectTemplate"
            value={sortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}

export default TodosViewForm;
