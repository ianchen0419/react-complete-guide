import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';

function Expenses(props) {
  const itemsHTML = props.items.map((item) => (
    <ExpenseItem
      date={item.date}
      title={item.title}
      amount={item.amount}
      key={item.id}
    />
  ));

  return <Card className="expenses">{itemsHTML}</Card>;
}

export default Expenses;
