import './ExpensesList.css';
import ExpenseItem from './ExpenseItem';

function ExpensesList(props) {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No expenses found.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
          key={expense.id}
        />
      ))}
    </ul>
  );
}

export default ExpensesList;
