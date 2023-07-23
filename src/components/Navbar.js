import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="navbar">
        <div className="left-section">
          <Link to="/">
            <h1>Discovery Buddy</h1>
          </Link>
        </div>
        <div className="right-section">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a className="login-btn" href="/login">Log In</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
