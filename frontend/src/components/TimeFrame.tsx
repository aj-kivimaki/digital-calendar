import React, { useState } from 'react';
import moment from 'moment';

interface CalendarBoxProps {
  date: moment.Moment;
}

const CalendarBox: React.FC<CalendarBoxProps> = ({ date }) => {
  return <div>{date.format('DD/MM/YYYY')}</div>;
};

const Calendar: React.FC = () => {
  const [startDate, setStartDate] = useState(moment());
  const endDate = moment(startDate).add(7, 'days');
  const datesToShow = [];

  for (let i = 0; i < 7; i++) {
    datesToShow.push(moment(startDate).add(i, 'days'));
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(moment(e.target.value));
  };

  return (
    <div>
      <input
        type="date"
        value={startDate.format('YYYY-MM-DD')}
        onChange={handleDateChange}
      />
      <div>
        {datesToShow.map((date) => (
          <CalendarBox key={date.format('YYYY-MM-DD')} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
