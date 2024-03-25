// styles
import "./SidebarSounds.css";

// music
import xmasMusic from "../assets/music/xmas-music.mp3";
import horrorMusic from "../assets/music/horror-music.mp3";

// sound-FX
import xmasFX from "../assets/sound-fx/xmas-fx.mp3";
import horrorFX from "../assets/sound-fx/horror-fx.mp3";

// components
import MusicChoice from "./MusicChoice";

const SidebarSounds = () => {
  return (
    <div className="sidebar-sounds">
      <h2>Background Music</h2>
      <div className="bg-music">
        <MusicChoice audioSrc={xmasMusic} title={"Christmas"} />
        <MusicChoice audioSrc={horrorMusic} title={"Horror"} />
      </div>
      <h2>Sound Effects</h2>
      <div className="sound-fx">
        <MusicChoice audioSrc={xmasFX} title={"Christmas"} />
        <MusicChoice audioSrc={horrorFX} title={"Horror"} />
        {/* <button className="btn">
          <input type="file" />
        </button> */}
      </div>
    </div>
  );
};

export default SidebarSounds;
