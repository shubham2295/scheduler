import React from 'react';
import 'components/InterviewerListItem.scss';
import classNames from 'classnames';

// renders single interviewer for interviewerlist
const InterviewerListItem = (props) => {

  const ILClass = classNames("interviewers__item", { "interviewers__item--selected": props.selected });

  return (
    <li className={ ILClass } onClick={ props.setInterviewer }>
      <img
        className="interviewers__item-image"
        src={ props.avatar }
        alt={ props.name }
      />
      { props.selected && props.name }
    </li>
  );
};

export default InterviewerListItem;
