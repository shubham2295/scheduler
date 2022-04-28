import React from 'react';

// intial state of the appointment slot when it's empty
const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={ props.onAdd }
      />
    </main>
  );
};

export default Empty;