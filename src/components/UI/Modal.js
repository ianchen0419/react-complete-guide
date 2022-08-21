import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

function Backdrop(props) {
  return (
    <div
      className={classes.backdrop}
      role="presentation"
      onClick={props.onClose}
    ></div>
  );
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
}

export default Modal;
