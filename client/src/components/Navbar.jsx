import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { logout as logoutAPI } from "../services/authService.js";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore backend errors on logout
    } finally {
      logout();
      navigate("/login");
      toast.success("Logged out successfully.");
    }
  };

  return (
    <nav style={{
      height: "56px",
      background: "#141414",
      borderBottom: "1px solid #2a2a2a",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Left — Logo */}
      <Link to="/" style={{
        color: "#fff",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: "15px",
      }}>
        Code Translator
      </Link>

      {/* Center — Nav links */}
      <div style={{ display: "flex", gap: "4px" }}>
        <Link to="/" style={{
          padding: "6px 14px",
          borderRadius: "6px",
          fontSize: "13px",
          textDecoration: "none",
          color: location.pathname === "/" ? "#fff" : "#888",
          background: location.pathname === "/" ? "#2a2a2a" : "transparent",
          transition: "all 0.2s",
        }}>
          Editor
        </Link>
        <Link to="/history" style={{
          padding: "6px 14px",
          borderRadius: "6px",
          fontSize: "13px",
          textDecoration: "none",
          color: location.pathname === "/history" ? "#fff" : "#888",
          background: location.pathname === "/history" ? "#2a2a2a" : "transparent",
          transition: "all 0.2s",
        }}>
          History
        </Link>
      </div>

      {/* Right — User + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user?.picture && (
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <span style={{ fontSize: "13px", color: "#aaa" }}>
          {user?.name}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 14px",
            background: "transparent",
            border: "1px solid #2a2a2a",
            borderRadius: "6px",
            color: "#888",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
