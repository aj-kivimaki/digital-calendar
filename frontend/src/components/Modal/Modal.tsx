import { useState, useEffect } from "react";
import EmbedVideo from "../EmbedVideo/EmbedVideo";
import "./Modal.css";

import { TextField, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
  day: number;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setDay: (day: number) => void;
  amountOfWindows: number;
  windowContent: WindowContent[];
  setWindowContent: (windowContent: WindowContent[]) => void;
};

type ContentVisibility = {
  [key: string]: boolean;
};

export interface WindowContent {
  videoURL: string;
  text: string;
  imageURL: string;
}

const Modal: React.FC<Props> = ({
  day,
  setDay,
  openModal,
  setOpenModal,
  amountOfWindows,
  windowContent,
  setWindowContent,
}) => {
  const [contentVisible, setContentVisible] = useState<ContentVisibility>({});

  useEffect(() => {
    if (openModal) {
      const savedContent = localStorage.getItem(`day_${day}_content`);
      if (savedContent) {
        setWindowContent(JSON.parse(savedContent));
      }
    } else {
      // Initialize content for each day if not present
      const newWindowContent = Array.from({ length: amountOfWindows }, () => ({
        videoURL: "",
        text: "",
        imageURL: "",
      }));
      setWindowContent(newWindowContent);
    }
  }, [openModal, day, setWindowContent, amountOfWindows]);

  const handleClick = (direction: string) => {
    if (direction === "previous") {
      if (day === 1) {
        return;
      }
      setDay(day - 1);
    } else {
      if (day === amountOfWindows) {
        return;
      }
      setDay(day + 1);
    }
  };

  const handleSave = () => {
    localStorage.setItem(`day_${day}_content`, JSON.stringify(windowContent));
    setOpenModal(false);
  };

  // show / hide content
  const toggleContent = (contentID: string) => {
    setContentVisible((prevState) => ({
      ...prevState,
      [contentID]: !prevState[contentID],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newWindowContent = [...windowContent];
      newWindowContent[day - 1] = {
        ...newWindowContent[day - 1],
        imageURL: reader.result as string,
      };
      setWindowContent(newWindowContent);
    };
    reader.readAsDataURL(file);
  };

  const { videoURL, text, imageURL } = windowContent[day - 1] || {
    videoURL: "",
    text: "",
    imageURL: "",
  };

  return (
 
    <div className={`modal ${openModal ? 'open' : ''}`}>
    <div className="modal-backdrop" onClick={() => setOpenModal(false)}></div>
    <div className="modal-content">
      <div className="modal-navigation"> 
        <div>Window: {day}</div>
        <div
          className="modal-navigation-item"
          onClick={() => handleClick("previous")}
        >
          Previous window
        </div>
        <div
          className="modal-navigation-item"
          onClick={() => handleClick("next")}
        >
          Next window
        </div>
      </div>
      <div className="image-input" style={{ margin: "20px" }}>
        <label htmlFor="image-upload">Upload Image:</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <div>
          {imageURL && (
            <>
              <p>Your saved image:</p>
              <img
                src={imageURL}
                alt="Uploaded"
                style={{ maxHeight: "150px"}}
              />
            </>
          )}
        </div>
      </div>

      <div className="texts">
        <TextField
          id="outlined-basic"
          multiline
          rows={4}
          label="Text"
          variant="outlined"
          value={text}
          onChange={(e) =>
            setWindowContent(
              windowContent.map((item, index) =>
                index === day - 1 ? { ...item, text: e.target.value } : item
              )
            )
          }
        />
      </div>

      {openModal && (
        <div className="close-modal" onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      )}

      <label className="video-input">
        <h3 onClick={() => toggleContent("video-input")}>
          <button> Add a video</button>
        </h3>
        {contentVisible["video-input"] && (
          <>
            <span className="span-text">Paste your URL here: </span>
            <input
              type="text"
              value={videoURL}
              onChange={(e) =>
                setWindowContent(
                  windowContent.map((item, index) =>
                    index === day - 1
                      ? { ...item, videoURL: e.target.value }
                      : item
                  )
                )
              }
            />
            <EmbedVideo videoURL={videoURL} />
          </>
        )}
      </label>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      </div>
    </div>
 
  );
};

export default Modal;
