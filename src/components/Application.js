import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    /* setDay, */
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const { day, days } = state;

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersForTheDay = getInterviewersForDay(state, state.day);

  const appointmentsList = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={ appointment.id }
        id={ appointment.id }
        time={ appointment.time }
        interview={ interview }
        interviewers={ interviewersForTheDay }
        bookInterview={ bookInterview }
        cancelInterview={ cancelInterview }
      />
    );

  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={ days } value={ day } onChange={ setDay }></DayList>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentsList }
        <Appointment key="last" time="5pm" />
      </section>
    </main >
  );
}
