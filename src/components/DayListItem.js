import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

//renders single day for daylist component
const DayListItem = (props) => {

  let listItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  const formatSpots = (spots) => {
    if (!spots) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li className={ listItemClass } onClick={ props.onChange } selected={ props.selected } data-testid="day">
      <h2 className="text--regular">{ props.value }</h2>
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  );
};

export default DayListItem;