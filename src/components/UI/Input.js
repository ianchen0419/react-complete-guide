import React from 'react';

import classes from './Input.module.css';

/**
 * Input Component
 *
 * @example
 * const inputProps = {
 *  label: 'Name',
 *  input: {
 *    id: 'k1',
 *    type: 'text',
 *  }
 * }
 * return (
 *  <Input label={inputProps.label} id={inputProps.input.id} type={inputProps.type} />
 * )
 */

function Input(props, ref) {
  const { id, type, min, max, step, defaultValue } = props.input;

  return (
    <div className={classes.input}>
      <label htmlFor={id}>{props.label}</label>
      <input
        ref={ref}
        type={type}
        id={id}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default React.forwardRef(Input);
