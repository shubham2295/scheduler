import React from 'react';

// displays intermediate status while user trying to perform save or delete actions
const Status = (props) => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{ props.message }</h1>
    </main>
  );
};

export default Status;