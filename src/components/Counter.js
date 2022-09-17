import { useDispatch, useSelector } from 'react-redux';

import { counterActions } from '../store/counter';

import classes from './Counter.module.css';

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  function incrementHandler() {
    dispatch(counterActions.increment());
  }

  function increaseHandler() {
    dispatch(counterActions.increase(5));
  }

  function decrementHandler() {
    dispatch(counterActions.decrement());
  }

  function toggleCounterHandler() {
    dispatch(counterActions.toggleCounter());
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
