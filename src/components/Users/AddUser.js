import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';

function AddUser(props) {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  function addUserHandler(event) {
    event.preventDefault();

    const nameRefValue = nameInputRef.current.value;
    const ageRefValue = ageInputRef.current.value;

    if (nameRefValue.trim().length === 0 || ageRefValue.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }

    if (+ageRefValue < 1) {
      setError({
        title: 'Invalid age',
        message: 'please enter a valid age (> 0).',
      });
      return;
    }

    props.onAddUser(nameRefValue, ageRefValue);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;
