import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import './ExistingImageGallery.css'; 

const CalendarEditor = () => {
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
            count: 8, 
            client_id: 'A9wMU_lZC4OW9kPTBjQOl6fncG6cTE13hDUtzDZ6xYE', 
          },
        });
        const imageUrls = response.data.map((photo: any) => photo.urls.small);
        setRandomImages(imageUrls);
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    };

     fetchRandomImages();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedBackground(imageUrl);
    document.body.style.backgroundImage = `url(${imageUrl})`;
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-images'>
        <Grid container spacing={1}>
          {randomImages.map((imageUrl, index) => (
            <Grid item key={index}>
              <img
                src={imageUrl}
                alt={`Random Image ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)}
                className='dashboard-image'
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <div className='dashboard-background' style={{ backgroundImage: `url(${selectedBackground})` }}></div>
    </div>
  );
};

export default CalendarEditor;
