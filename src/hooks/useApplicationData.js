import { useEffect, useReducer } from 'react';
import axios from 'axios';

const stateReducer = (state, action) => {

  if (action.type === "SET_DAY") {
    return { ...state, day: action.day };
  }
  if (action.type === "API_DATA") {
    return {
      ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers
    };
  }
  if (action.type === "SET_INTERVIEW") {
    const appointment = {
      ...state.appointments[action.id],
      interview: { ...(action.interview) }
    };

    const appointments = {
      ...state.appointments,
      [action.id]: appointment
    };

    const days = state.days.map(day => {
      if (day.name === state.day) {
        let spots = day.spots;
        if (action.interview) {
          spots--;
        } else {
          spots++;
        }

        return { ...day, spots: spots };

      }
      return day;
    });

    return {
      ...state,
      appointments,
      days
    };
  }
  return state;

};


const useApplicationData = () => {

  const [state, dispatchState] = useReducer(stateReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatchState({ type: "SET_DAY", day });

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')])
      .then(([daysResponse, appointmentsResponse, interviewrsResponse]) => {
        dispatchState({
          type: "API_DATA",
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewrsResponse.data
        });
      });
  }, []);



  const bookInterview = (id, interview) => {

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        dispatchState({ type: "SET_INTERVIEW", id, interview });
      })
      .catch(error => Promise.reject(error));

  };

  const cancelInterview = (id) => {

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        dispatchState({ type: "SET_INTERVIEW", id, interview: null });
      })
      .catch(error => Promise.reject(error));
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};

export default useApplicationData;