import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';

// renders interviewer list inside the appointement form
const InterviewerList = (props) => {

  const interviewerList = props.interviewers.map(interviewer =>
    <InterviewerListItem
      key={ interviewer.id }
      name={ interviewer.name }
      avatar={ interviewer.avatar }
      setInterviewer={ () => props.onChange(interviewer.id) }
      selected={ interviewer.id === props.value }
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { interviewerList }
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;