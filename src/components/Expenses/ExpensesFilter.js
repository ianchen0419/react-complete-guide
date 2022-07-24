import './ExpensesFilter.css';

function ExpensesFilter(props) {
  function dropdownChangeHandler(event) {
    // console.log(event.target.value);
    props.onFilterChange(event.target.value);
  }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label htmlFor="year">Filter by year</label>
        <select
          value={props.selected}
          onChange={dropdownChangeHandler}
          id="year"
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
}

export default ExpensesFilter;
