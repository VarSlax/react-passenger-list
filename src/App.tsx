import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import { Home, PassengerList } from './pages';

export function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" aria-label="Passenger Hub Home" className="logo-link">
            <h1>Passenger Hub</h1>
          </Link>
          <nav className="app-nav">
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/passengers/all" className="nav-link">
                  Passengers
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passengers/all" element={<PassengerList />} />
          <Route path="*" element={<div className="error-message">Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}
