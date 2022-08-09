import React from 'react';

import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      type={props.type === 'submit' ? 'submit' : 'button'}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
