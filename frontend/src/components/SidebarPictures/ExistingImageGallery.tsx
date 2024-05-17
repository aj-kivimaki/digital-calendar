import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import "./ExistingImageGallery.css";

type Props = {
  setSelectedBackground: (backgroundUrl: string) => void;
};

const ExistingImageGallery: React.FC<Props> = ({ setSelectedBackground }) => {
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      searchImages();
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const fetchRandomImages = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            count: 12,
            client_id: "A9wMU_lZC4OW9kPTBjQOl6fncG6cTE13hDUtzDZ6xYE",
          },
        }
      );
      const imageUrls = response.data.map((photo: any) => photo.urls.regular);
      setRandomImages(imageUrls);
    } catch (error) {
      console.error("Error fetching random images:", error);
    }
  };

  const searchImages = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchQuery,
            per_page: 12,
            client_id: "A9wMU_lZC4OW9kPTBjQOl6fncG6cTE13hDUtzDZ6xYE",
          },
        }
      );
      const imageUrls = response.data.results.map((photo: any) => photo.urls.regular);
      setSearchResults(imageUrls);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching images:", error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedBackground(imageUrl);
    console.log('Selected background:', imageUrl);
  };

  const refreshSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const imagesToDisplay = showSearchResults ? searchResults : randomImages;

  return (
    <div className="dashboard-images">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={refreshSearch}>Refresh</button>
      </div>
      <Grid container spacing={1}>
        {imagesToDisplay.map((imageUrl, index) => (
          <Grid item key={index}>
            <img
              src={imageUrl}
              alt={`Random Image ${index + 1}`}
              onClick={() => handleImageClick(imageUrl)}
              className="dashboard-image"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExistingImageGallery;
