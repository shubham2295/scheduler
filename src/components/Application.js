import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const { day, days } = state;
  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')])
      .then(([daysResponse, appointmentsResponse, interviewrsResponse]) => {
        setState(prev => (
          {
            ...prev, days: daysResponse.data,
            appointments: appointmentsResponse.data,
            interviewers: interviewrsResponse.data
          })
        );
      });
  }, []);

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        setState(prev => ({ ...prev, appointments }));
      });

  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments }));
      });


  };




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
