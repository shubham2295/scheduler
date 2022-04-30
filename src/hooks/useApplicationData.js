import { useEffect, useReducer } from 'react';
import axios from 'axios';

// replacing baseurl for hosted version
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

// reducer function to handle to dispatch actions
const stateReducer = (state, action) => {

  if (action.type === "SET_DAY") {
    return { ...state, day: action.day };
  }
  if (action.type === "API_DATA") {
    return {
      ...state,
      days: action.days,
      appointments: action.appointments,
      interviewers: action.interviewers
    };
  }
  if (action.type === "SET_INTERVIEW") {
    const appointment = {
      ...state.appointments[action.id],
      interview: (!action.interview) ? null : { ...(action.interview) }
    };

    const appointments = {
      ...state.appointments,
      [action.id]: appointment
    };

    const prevInterview = state.appointments[action.id].interview;
    // updateds the spots based on cancel/add interview dispatch call
    const days = state.days.map(day => {
      if (day.name === state.day) {
        let spots = day.spots;
        if (!prevInterview) spots--;
        if (!action.interview) spots++;
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

// custom hoook for fetching and updating the data to server
const useApplicationData = () => {

  const [state, dispatchState] = useReducer(stateReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')])
      .then(([daysResponse, appointmentsResponse, interviewrsResponse]) => {
        dispatchState({
          type: "API_DATA",
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewrsResponse.data
        });
      });

  }, []);

  const setDay = day => dispatchState({ type: "SET_DAY", day });

  const bookInterview = (id, interview) => {

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        dispatchState({ type: "SET_INTERVIEW", id, interview });
      })
      .catch(error => Promise.reject(error));

  };

  const cancelInterview = (id) => {

    return axios.delete(`/api/appointments/${id}`)
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