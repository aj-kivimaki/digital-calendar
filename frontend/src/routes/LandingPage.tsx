import { ParallaxProvider } from "react-scroll-parallax";
import Login from "./Login";
import Favourite from "./Favourite";
import { useAppSelector } from "../hooks/useAppDispatch";
import MainPricing from "../components/LandingPage/Pricing/MainPricing";
import Ban from "../components/LandingPage/banner/Ban";
import Services from "../components/LandingPage/services/Services";

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
        <Ban/>
        <Services></Services>
        <MainPricing />
        <div style={{ marginBottom: "250px" }}>
          {!token && <Login />}
          {token && (
            <Favourite
              search={search}
              handleSearch={handleSearch}
              setSearch={setSearch}
            />
          )}
        </div>
      </ParallaxProvider>
    </div>
  );
};

export default LandingPage;