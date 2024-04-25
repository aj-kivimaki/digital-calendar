import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar_Card from '../components/Calendar_Card';

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
      subtitleFontSize: number; // Fixed typo here
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

const Calendars: React.FC = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);

  const getCalendars = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/firestore/calendars'
      );
      console.log('firestore/calendars');
      console.log(response.data);
      setCalendars(response.data);
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  useEffect(() => {
    getCalendars();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        All the calendars ({calendars.length}) made with this app
      </h1>
      <Calendar_Card
        calendars={calendars} // Pass calendars as prop
        search={''}
        setSearch={() => {}}
      />
    </div>
  );
};

export default Calendars;
