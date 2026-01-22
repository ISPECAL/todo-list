function TodosViewForm({
  sortField,
  sortDirection,
  onSortFieldChange,
  onSortDirectionChange,
  queryString,
  setQueryString,
}) {
  return (
    <form>
      <div>
        <label>
          Search todos:
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <label>
          Sort by:
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value)}
          >
            <option value="createdTime">Created Time</option>
            <option value="title">Title</option>
          </select>
        </label>
        <label>
          Direction:
          <select
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
