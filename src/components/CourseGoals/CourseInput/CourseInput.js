import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

function CourseInput(props) {
  const [enteredValue, setEnteredValue] = useState('');

  function goalInputChangeHandler(event) {
    setEnteredValue(event.target.value);
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    props.onAddGoal(enteredValue);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label htmlFor="goal">Course Goal</label>
        <input id="goal" type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
}

export default CourseInput;
