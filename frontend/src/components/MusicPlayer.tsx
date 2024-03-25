import { useState, useRef } from "react";

// styles
import "./MusicPlayer.css";

// icons
import HearingIcon from "@mui/icons-material/Hearing";
import StopCircleIcon from "@mui/icons-material/StopCircle";

type Props = {
  audioSrc: string;
};

const MusicPlayer: React.FC<Props> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0; // Reset playback to the beginning
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="music-player">
      <button className="btn" onClick={togglePlay}>
        {!isPlaying ? <HearingIcon /> : <StopCircleIcon />}
      </button>
    </div>
  );
};

export default MusicPlayer;
