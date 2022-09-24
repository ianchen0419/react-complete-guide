import { useEffect, useRef } from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

import classes from './NewCommentForm.module.css';

function NewCommentForm(props) {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    sendRequest({
      commentData: {
        text: enteredText,
      },
      quoteId: props.quoteId,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button type="submit" className="btn">
          Add Comment
        </button>
      </div>
    </form>
  );
}

export default NewCommentForm;
