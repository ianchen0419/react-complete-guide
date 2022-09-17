import { useDispatch, useSelector } from 'react-redux';

import classes from './Counter.module.css';

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  function incrementHandler() {
    dispatch({ type: 'increment' });
  }

  function increaseHandler() {
    dispatch({ type: 'increase', amount: 5 });
  }

  function decrementHandler() {
    dispatch({ type: 'decrement' });
  }

  function toggleCounterHandler() {
    dispatch({ type: 'toggle' });
  }

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button type="button" onClick={decrementHandler}>
          Decrement
        </button>
        <button type="button" onClick={incrementHandler}>
          Increment
        </button>
        <button type="button" onClick={increaseHandler}>
          Increse by 5
        </button>
      </div>
      <div></div>
      <button type="button" onClick={toggleCounterHandler}>
        Toggle Counter
      </button>
    </main>
  );
}

export default Counter;
