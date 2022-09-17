import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

function counterReducer(state = initialState, action = {}) {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
}

const store = createStore(counterReducer);

export default store;
