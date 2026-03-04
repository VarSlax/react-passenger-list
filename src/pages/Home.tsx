import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <main className="home-container" aria-labelledby="home-title">
      <header className="home-header">
        <h2 id="home-title">Welcome to the Hub</h2>
        <p>Your gateway to seamless travel management.</p>
      </header>
      <nav className="home-actions">
        <Link
          to="/passengers/all"
          className="submit-btn"
          aria-label="Get started by viewing all passengers"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          View All Passengers
        </Link>
      </nav>
    </main>
  );
};
