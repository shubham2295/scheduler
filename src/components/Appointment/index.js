import React from 'react';
import '../Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Form from './Form';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//Displays different modes of appointment slots based on user interactions
const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id, { ...interview })
      .then(response => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = (id) => {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(response => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={ props.time } />
      { mode === EMPTY && <Empty onAdd={ () => transition(CREATE) } /> }
      { mode === CREATE &&
        <Form
          interviewers={ props.interviewers }
          onCancel={ back }
          onSave={ save } /> }
      { mode === SAVING && <Status message="Saving" /> }
      { mode === DELETING && <Status message="Deleting" /> }
      { mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={ () => transition(SHOW) }
          onConfirm={ () => deleteAppointment(props.id) } /> }
      { mode === EDIT &&
        <Form
          interviewer={ props.interview.interviewer.id }
          interviewers={ props.interviewers }
          student={ props.interview.student }
          onCancel={ back }
          onSave={ save } /> }
      { mode === SHOW && (
        <Show
          student={ props.interview.student }
          interviewer={ props.interview.interviewer }
          onDelete={ () => transition(CONFIRM) }
          onEdit={ () => transition(EDIT) }
        />
      ) }
      { mode === ERROR_DELETE && <Error message="Something went wrong" onClose={ back } /> }
      { mode === ERROR_SAVE && <Error message="Something went wrong" onClose={ back } /> }
    </article>
  );
};

export default Appointment;
