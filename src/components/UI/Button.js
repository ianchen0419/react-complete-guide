import classes from './Button.module.css';

function Button(props) {
  return (
    <button
      type={props.type === 'submit' ? 'submit' : 'button'}
      className={classes.button}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
