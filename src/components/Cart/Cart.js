import { useContext } from 'react';

import Modal from '../UI/Modal';

import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

import classes from './Cart.module.css';

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id);
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          item={item}
          onRemove={cartItemRemoveHandler}
          onAdd={cartItemAddHandler}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes['button--alt']}
          onClick={props.onClose}
        >
          Close
        </button>
        {hasItems && (
          <button type="button" className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
