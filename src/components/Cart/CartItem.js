import classes from './CartItem.module.css';

function CartItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  function removeHandler() {
    props.onRemove(props.id);
  }

  function addHandler() {
    props.onAdd(props.item);
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={removeHandler}>
          −
        </button>
        <button type="button" onClick={addHandler}>
          +
        </button>
      </div>
    </li>
  );
}

export default CartItem;
