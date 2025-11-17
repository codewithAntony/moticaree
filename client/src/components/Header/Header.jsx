import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function Header() {
  const { isLogin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("Token");
    window.location.reload();
  }

  // Inline styles for hamburger lines
  const lineStyle = {
    display: "block",
    height: "3px",
    width: "25px",
    background: "#000",
    borderRadius: "2px",
    position: "absolute",
    left: 0,
    transition: "all 0.3s ease-in-out",
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light shadow p-0"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030,
          backgroundColor: "white",
        }}
      >
        <Link to="/" className="navbar-brand d-flex align-items-center px-lg-5">
          <h2 className="m-0 text-primary">
            <i className="fa fa-car mx-1"></i>MotiCare
          </h2>
        </Link>

        {/* Hamburger Toggle */}
        <button
          type="button"
          className="navbar-toggler me-4"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ position: "relative", width: "25px", height: "18px" }}
        >
          <span
            style={{
              ...lineStyle,
              top: menuOpen ? "7.5px" : "0px",
              transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
          <span
            style={{
              ...lineStyle,
              top: "7.5px",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...lineStyle,
              top: menuOpen ? "7.5px" : "15px",
              transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          />
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarCollapse"
        >
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/services" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
            {isLogin && (
              <Link to="/dashboard" className="nav-item nav-link">
                Admin
              </Link>
            )}
          </div>

          {isLogin ? (
            <div onClick={logOut}>
              <Link
                to="/login"
                className="btn btn-primary d-none d-lg-block"
                style={{
                  width: "90px",
                  height: "45px",
                  marginRight: "30px",
                  paddingTop: "12px",
                  fontSize: "14px",
                  borderRadius: "3px",
                }}
              >
                logout
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="btn btn-primary d-none d-lg-block"
                style={{
                  width: "90px",
                  height: "45px",
                  marginRight: "30px",
                  paddingTop: "12px",
                  fontSize: "14px",
                  borderRadius: "3px",
                }}
              >
                logIn
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
