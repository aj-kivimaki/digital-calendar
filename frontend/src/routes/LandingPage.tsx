import { BannerTop } from "../components/LandingPage/banner/BannerTop";
import { ParallaxProvider } from "react-scroll-parallax";
import Login from "./Login";
import Favourite from "./Favourite";
import { useAppSelector } from "../hooks/useAppDispatch";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LandingPage: React.FC<Props> = ({ search, handleSearch, setSearch }) => {
  const token = useAppSelector((state) => state.token.token);

  return (
    <div>
      <ParallaxProvider>
        <BannerTop />
        <div style={{ marginBottom: "300px" }}>{!token && <Login />}</div>
        {/* <div className="center full">
            <h1 className="headline gray"></h1>
          </div>  */}
        {token && (
          <Favourite
            search={search}
            handleSearch={handleSearch}
            setSearch={setSearch}
          />
        )}
      </ParallaxProvider>
    </div>
  );
};

export default LandingPage;
