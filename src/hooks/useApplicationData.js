import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

    const days = updateDays(state.day, appointments);

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        setState(prev => ({ ...prev, appointments, days }));
      })
      .catch(error => Promise.reject(error));

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

    const days = updateDays(state.day, appointments);

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState(prev => ({ ...prev, appointments, days }));
      })
      .catch(error => Promise.reject(error));
  };

  const updateSpots = (dayName, appointments) => {
    let spots = 0;
    const currentDayObject = (state.days.filter(day => day.name === dayName))[0];
    if (currentDayObject) {
      const appointmentsArrayForCurrentDay = currentDayObject.appointments;
      spots = appointmentsArrayForCurrentDay.reduce((prev, current) => {
        if (!appointments[current].interview) {
          return prev + 1;
        }
        return prev;
      }, 0);

    }
    console.log("Spots", spots);
    return spots;
  };

  const updateDays = (dayName, appointments) => {

    const updatedDaysList = state.days.map(day => {
      if (day.name === dayName) {
        return { ...day, spots: updateSpots(dayName, appointments) };
      }
      return day;
    });

    return updatedDaysList;

  };



  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};

export default useApplicationData;