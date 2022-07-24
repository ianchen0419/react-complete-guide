import React, { useState } from 'react';
import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2020');

  function filterChangeHandler(selectedYear) {
    console.log(selectedYear);
    setFilteredYear(selectedYear);
  }

  const itemsHTML = props.items.map((item) => (
    <ExpenseItem
      date={item.date}
      title={item.title}
      amount={item.amount}
      key={item.id}
    />
  ));

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      {itemsHTML}
    </Card>
  );
}

export default Expenses;
