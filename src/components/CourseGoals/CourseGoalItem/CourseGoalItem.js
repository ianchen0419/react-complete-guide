import React from 'react';

import './CourseGoalItem.css';

function CourseGoalItem(props) {
  // const [deleteText, setDeleteText] = useState('');

  function deleteHandler() {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  }

  return (
    <li className="goal-item">
      <button type="button" onClick={deleteHandler}>
        {props.children}
      </button>
    </li>
  );
}

export default CourseGoalItem;
