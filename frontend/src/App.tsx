import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// routes
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import ErrorPage from './routes/ErrorPage';
// import Login from "./routes/Login";
import Register from './routes/Register';
import Panel from './routes/Panel';
import Favourites from './routes/Favourites';
import Root from './routes/Root';
import LandingPage from './routes/LandingPage';
import Test from './routes/Test';
import MainApp from './components/Calendar/MainApp';
import Calendars from './routes/Calendars';
import CalendarSingle from './routes/CalendarSingle';

// redux
import { store } from './store/store';
import { Provider } from 'react-redux';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path=""
            element={<Root handleSearch={handleSearch} search={search} />}
          >
            <Route path="home" element={<Home />} />
            <Route index path="/" element={<LandingPage />} />
            <Route path="login" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/test" element={<Test />} />
            <Route path="/preview" element={<MainApp />} />
            <Route
              path="/calendars"
              element={<Calendars search={search} setSearch={setSearch} />}
            />
            <Route path="/calendars/:calendarId" element={<CalendarSingle />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
