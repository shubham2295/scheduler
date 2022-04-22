/* eslint-disable func-style */



export function getAppointmentsForDay(state, day) {

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

}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  return { ...interview, interviewer: state.interviewers[interviewerId] };

}