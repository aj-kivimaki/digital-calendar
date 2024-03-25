// components
import { useState } from "react";
import MusicPlayer from "./MusicPlayer";

// icons
import AddIcon from "@mui/icons-material/Add";

type Props = {
  audioSrc: string;
  title: string;
};

const MusicChoice: React.FC<Props> = ({ audioSrc, title }) => {
  const [addedSound, setAddedSound] = useState<string>();

  const handleAdd = (audioSrc: string) => {
    setAddedSound(audioSrc);
  };

  console.log(addedSound);

  return (
    <>
      <h3>{title}</h3>
      <div className="flex">
        <button onClick={() => handleAdd(audioSrc)} className="btn">
          {<AddIcon fontSize="small" />}
        </button>
        <MusicPlayer audioSrc={audioSrc} />
      </div>
    </>
  );
};

export default MusicChoice;
