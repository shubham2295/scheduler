
const getAppointmentsForDay = (state, day) => {

  let appointmentIdArray = [];

  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      appointmentIdArray = currentDay.appointments;
    }
  }

  const result = appointmentIdArray.map(appointmentId => {
    return state.appointments[appointmentId];
  });

  return result;

};

const getInterview = (state, interview) => {

  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  return { ...interview, interviewer: state.interviewers[interviewerId] };

};

const getInterviewersForDay = (state, day) => {

  let interviewersIDArray = [];

  for (const currentDay of state.days) {
    if (currentDay.name === day) {
      interviewersIDArray = currentDay.interviewers;
    }
  }

  const result = interviewersIDArray.map(interviewerId => {
    return state.interviewers[interviewerId];
  });

  return result;

};

export { getInterviewersForDay, getInterview, getAppointmentsForDay };