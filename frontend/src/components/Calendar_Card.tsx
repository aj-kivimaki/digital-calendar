import { Link } from "react-router-dom";

interface Card {
  title: string;
  windowsNumber: number;
  link: string;
  imageURL: string;
  onClick?: () => void;
}

const Calendar_Card: React.FC<Card> = ({
  title,
  imageURL,
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
      <div style={{
        backgroundImage: `url(${imageURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        width: "100%",
        height: "200px",
      }}></div>
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
