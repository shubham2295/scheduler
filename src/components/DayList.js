import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {

  const daysList = props.days.map(day =>
    <DayListItem
      key={ day.id }
      value={ day.name }
      spots={ day.spots }
      selected={ props.value === day.name }
      onChange={ () => props.onChange(day.name) }
    />
  );

  return (
    <ul>
      { daysList }
    </ul>
  );
}
