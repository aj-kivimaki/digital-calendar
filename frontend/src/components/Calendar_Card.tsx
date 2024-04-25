import { Link } from 'react-router-dom';
import '../routes/Calendar.css';

interface Calendar {
  calendarId: string;
  calendarName: string;
  data: {
    windows: string[];
    text: {
      title: string;
      titleFont: string;
      titleFontSize: number;
      titleColor: string;
      subtitle: string;
      subtitleFont: string;
      subtitleFontSize: number;
      subtitleColor: string;
    };
    sounds: {
      musicName: string;
      soundFxName: string;
    };
    image: {
      imageUrl: string;
      uploadedImageName: string;
    };
    windowsContent: string[];
    // Add more properties as needed
  };
}

type Props = {
  calendars: Calendar[]; // Receive calendars as prop
  search: string;
  setSearch: (search: string) => void;
};

const Calendar_Card: React.FC<Props> = ({ calendars, search, setSearch }) => {
  return (
    <>
      <div className="calendars">
        {calendars
          .filter((elem) =>
            elem.data.text.title.toLowerCase().startsWith(search.toLowerCase())
          )
          .map((calendar) => (
            <div key={calendar.calendarId} className="calendar-card">
              <h2>{calendar.data.text.title}</h2>
              <p>{calendar.calendarId}</p>
              <span>Amount of windows: {calendar.data.windows.length}</span>
              <Link
                to={`/calendars/${calendar.calendarId}`}
                onClick={() => setSearch('')}
                className="calender-view"
              >
                View
              </Link>
              {/* <p>By: 'user name here'</p> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default Calendar_Card;
