import React from 'react';
import '../Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  console.log(props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, { ...interview })
      .then(response => {
        transition(SHOW);
      });
  };

  const deleteAppointment = (id) => {
    transition(DELETING);
    props.cancelInterview(id)
      .then(response => {
        transition(EMPTY);
      });
  };

  return (
    <article className="appointment">
      <Header time={ props.time } />
      { mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } /> }
      { mode === CREATE && <Form
        interviewers={ props.interviewers }
        onCancel={ () => back() }
        onSave={ save } /> }
      { mode === SAVING && <Status message="Saving" /> }
      { mode === DELETING && <Status message="Deleting" /> }
      { mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={ () => transition(SHOW) }
        onConfirm={ () => deleteAppointment(props.id) } /> }
      { mode === EDIT && <Form
        interviewer={ props.interview.interviewer.id }
        interviewers={ props.interviewers }
        student={ props.interview.student }
        onCancel={ () => back() }
        onSave={ save } /> }
      { mode === SHOW && (
        <Show
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
          onDelete={ () => transition(CONFIRM) }
          onEdit={ () => transition(EDIT) }
        />
      ) }
    </article>
  );
}
