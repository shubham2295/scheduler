import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

// a controlled component to store and updated appointement data
const Form = (props) => {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // resets form inputfields on cancel
  const reset = () => {
    setError("");
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => props.onCancel();

  // validates form input fields on save
  const validate = () => {

    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={ (e) => e.preventDefault() }>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ student }
            onChange={ (e) => setStudent(e.target.value) }
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{ error }</section>
        <InterviewerList
          interviewers={ props.interviewers }
          value={ interviewer }
          onChange={ setInterviewer }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ () => {
            reset(); cancel();
          } }>Cancel</Button>
          <Button confirm onClick={ () => {
            validate(student, interviewer);
          } }>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;