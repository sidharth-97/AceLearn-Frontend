import React, { useEffect, useState } from 'https://cdn.skypack.dev/react?min';
import moment from 'https://cdn.skypack.dev/moment?min';
import { useQuery } from 'react-query';
import { studentTimeline } from '../../api/studentapi';

const DayNames = {
  1: 'Mon',
  3: 'Wed',
  5: 'Fri'
};

function Cell({ color }) {
  let style = {
    backgroundColor: color
  };

  return (
    <div className='timeline-cells-cell' style={style}></div>
  );
}

function Month({ startDate, index }) {
  let date = moment(startDate).add(index * 7, 'day');
  let monthName = date.format('MMM');

  return (
    <div className={`timeline-months-month ${monthName}`}>
      {monthName}
    </div>
  );
}

function WeekDay({ index }) {
  return (
    <div className='timeline-weekdays-weekday'>
      {DayNames[index]}
    </div>
  );
}

function TimelineApp() {
  const { data: stdData } = useQuery({
    queryFn: studentTimeline
  });
  console.log(stdData?.data, 'from timeline');

  const mostAttendedDate = stdData?.data.length > 0 ? moment(stdData.data[0]._id).toDate() : null;

    const data = stdData?.data || [];
    console.log(data,"data from timeliene");
    

  const startDate = moment().add(-365, 'days');
  const dateRange = [startDate, moment()];

  let days = Math.abs(dateRange[0].diff(dateRange[1], 'days'));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let min = Math.min(0, ...data.map(d => d.totalClasses || 0));
  let max = Math.max(...data.map(d => d.totalClasses || 0));

  let colorMultiplier = 1 / (max - min);

  return (
    <div className='timeline'>
      <div className="timeline-months">
        {months.map((_, index) => <Month key={index} index={index} startDate={startDate} />)}
      </div>
      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
        </div>
        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'day');
            let dataPoint = data.find(d => moment(date).format('DDMMYYYY') === moment(d._id).format('DDMMYYYY'));
            let alpha = colorMultiplier * (dataPoint?.totalClasses || 0); // Use totalClasses from API response
            let color = `rgba(3, 160, 3, ${alpha})`;

            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TimelineApp;
