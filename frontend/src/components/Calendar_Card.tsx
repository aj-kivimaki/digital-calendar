import { Link } from "react-router-dom";

interface Card {
  title: string;
  windowsNumber: number;
  link: string;
  imageUrl: string;
  onClick?: () => void;
}

const Calendar_Card: React.FC<Card> = ({
  title,
  imageUrl,
  windowsNumber,
  link,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="calendar-card">
      <img src={imageUrl} alt={imageUrl} className="calendar-img" />
      <h2>{title}</h2>
      <span>Amount of windows: {windowsNumber}</span>
      <Link
        to={`/calendars/${link}`}
        className="calender-view"
        onClick={handleClick}
      >
        View
      </Link>
    </div>
  );
};

export default Calendar_Card;