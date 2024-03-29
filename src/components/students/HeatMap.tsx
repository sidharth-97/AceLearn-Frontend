import moment from 'moment';
import { useQuery } from 'react-query';
import { studentTimeline } from '../../api/studentapi';

const DayNames:any = {
  1: 'Mon',
  3: 'Wed',
  5: 'Fri'
};

function Cell({ color }:{color:string}) {
  let style = {
    backgroundColor: color
  };

  return (
    <div className='timeline-cells-cell' style={style}></div>
  );
}

function Month({ startDate, index }:{startDate: moment.Moment ,index:number}) {
  let date = moment(startDate).add(index * 7.5, 'day');
  let monthName = date.format('MMM');

  return (
    <div className={`timeline-months-month ${monthName}`}>
      {monthName}
    </div>
  );
}

function WeekDay({ index}: { index: number; startDate: moment.Moment }) {
  
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


  // const mostAttendedDate = stdData?.data.length > 0 ? moment(stdData.data[0]._id).toDate() : null;

    const data = stdData?.data || [];
    

  const startDate = moment().add(-365, 'days');
  const dateRange = [startDate, moment()];

  let days = Math.abs(dateRange[0].diff(dateRange[1], 'days'));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(7));
  let months = Array.from(new Array(Math.floor(days / 7)));

  let min =data.length && Math.min(0, ...data.map((d: { totalClasses: any; }) => d.totalClasses || 0));
  let max =data.length && Math.max(...data.map((d: { totalClasses: any; }) => d.totalClasses || 0));

  let colorMultiplier = 1 / (max - min);

  return (
    <>
      {data.length > 0 ? (
        <div className='timeline'>
          <div className="timeline-months">
            {months.map((_, index) => (
              <Month key={index} index={index} startDate={startDate} />
            ))}
          </div>
          <div className="timeline-body">
            <div className="timeline-weekdays">
              {weekDays.map((_, index) => (
                <WeekDay key={index} index={index} startDate={startDate} />
              ))}
            </div>
            <div className="timeline-cells">
              {cells.map((_, index) => {
                let date = moment(startDate).add(index, 'day');
                let dataPoint = data.find(
                  (d: { _id: moment.MomentInput; }) => moment(date).isSame(d._id, 'day')
                );
                let alpha = Math.min(
                  1,
                  Math.max(0, colorMultiplier * (dataPoint?.totalClasses || 0))
                );
                let color = `rgba(3, 160, 3, ${alpha})`;

                return <Cell key={index} color={color} />;
              })}
            </div>
          </div>
        </div>
      ) : (<div className=' h-24 flex justify-center items-center w-full'>
          <h1>Not enough data to show the timeline</h1>
      </div>)}
    </>
  );
}

export default TimelineApp;
