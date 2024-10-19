import {useState} from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
} from 'date-fns';

import {FaAngleLeft, FaAngleRight} from 'react-icons/fa6';
// import {useSearchEvents} from '@/lib/react-query/queriesAndMutations/event';
// import {getYearAndMonth, incrementUntilTarget} from '@/utils/utilities';
import {useNavigate} from '@tanstack/react-router';
import {useModal} from '@/context/ModalContext';

type day = number;

interface IEventTypes {
  EventID: string;
  StartDate: string;
  EndDate: string;
  EventName: string;
  days: day[];
}

const Calendar = () => {
  const navigate = useNavigate();
  const {openModal} = useModal();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const startOfMonthDate = startOfMonth(currentMonth);
  const endOfMonthDate = endOfMonth(currentMonth);
  const startWeekDate = startOfWeek(startOfMonthDate);
  const endWeekDate = endOfWeek(endOfMonthDate);

  const days = eachDayOfInterval({start: startWeekDate, end: endWeekDate});

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // const {data: eventResponse} = useSearchEvents({
  //   query: '',
  // });

  // const loadEventDates = eventResponse?.data?.events
  //   ?.filter(
  //     (eventDates: {StartDate: string; EndDate: string}) =>
  //       getYearAndMonth(eventDates.StartDate) ===
  //       getYearAndMonth(String(currentMonth)),
  //   )
  //   .map((events: IEventTypes) => ({
  //     EventID: events.EventID,
  //     StartDate: events.StartDate,
  //     EndDate: events.EndDate,
  //     EventName: events.EventName,
  //     days: incrementUntilTarget(
  //       parseInt(format(events.StartDate, 'd')),
  //       parseInt(format(events.EndDate, 'd')),
  //     ),
  //   }));

  const mockEvents: IEventTypes[] = [
    {
      EventID: '1',
      StartDate: '2024-09-18',
      EndDate: '2024-09-20',
      EventName: 'Conference Event',
      days: [18, 19, 20],
    },
    {
      EventID: '2',
      StartDate: '2024-09-22',
      EndDate: '2024-09-23',
      EventName: 'Music Concert',
      days: [22, 23],
    },
    {
      EventID: '3',
      StartDate: '2024-09-25',
      EndDate: '2024-09-27',
      EventName: 'Art Exhibition',
      days: [25, 26, 27],
    },
  ];

  const loadEventDates = mockEvents.map((events: IEventTypes) => ({
    EventID: events.EventID,
    StartDate: events.StartDate,
    EndDate: events.EndDate,
    EventName: events.EventName,
    days: events.days,
  }));

  // handle navigation to events

  const navigateToEvents = (path: string) => {
    navigate({
      to: path,
    });
  };

  const addEventHandler = () => {
  };

  return (
    <>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <header className="flex items-center justify-between bg-primary p-4 text-white">
          <button onClick={handlePrevMonth} className="text-sm">
            <FaAngleLeft />
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button onClick={handleNextMonth} className="text-sm">
            <FaAngleRight />
          </button>
        </header>

        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th
                  key={day}
                  className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((_, index) => (
              <tr key={index} className="grid grid-cols-7">
                {days.slice(index * 7, index * 7 + 7).map((date, idx) => (
                  <td
                    key={idx}
                    className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
                    onClick={addEventHandler}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {format(currentMonth, 'M') === format(date, 'M')
                        ? format(date, 'd')
                        : ''}
                    </span>
                    <div className="absolute left-0 z-99 w-full">
                      {loadEventDates?.map((event: IEventTypes) => {
                        const day = parseInt(format(date, 'd'));
                        if (event.days.includes(day)) {
                          const index = event.days.indexOf(day);
                          return (
                            <div
                              key={event.EventName}
                              className={`${index === 0 && 'ml-4 border-l-4 border-primary'} ${idx === 6 ? 'ml-4 min-w-20' : 'w-full'} sm:2 relative mt-1 min-h-12 bg-slate-100 pl-4 md:h-2`}
                              onClick={() =>
                                navigateToEvents(`/events/${event.EventID}`)
                              }
                            >
                              {day === event.days[0] ? (
                                <>
                                  <p className="pt-1 text-sm font-semibold">
                                    {event.EventName}
                                  </p>
                                  <p className="pt-1 text-xs font-semibold">
                                    {format(event.StartDate, 'd') +
                                      ' ' +
                                      format(event.EndDate, 'MMM') +
                                      ' - ' +
                                      format(event.EndDate, 'd') +
                                      ' ' +
                                      format(event.EndDate, 'MMM')}
                                  </p>
                                </>
                              ) : (
                                <p>{}</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
