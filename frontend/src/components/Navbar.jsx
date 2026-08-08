import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Left Side */}
      <div className="navbar-left">

        <div className="logo-icon">
          ₹
        </div>

        <div className="navbar-title">
          <h2>Bank Management System</h2>
          <span>Secure Banking Dashboard</span>
        </div>

      </div>

      {/* Right Side */}
      <div className="navbar-right">

        <div className="user-avatar">
          K
        </div>

        <div className="user-info">
          <span className="welcome-text">
            Welcome back
          </span>

          <strong>
            Keshav
          </strong>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;