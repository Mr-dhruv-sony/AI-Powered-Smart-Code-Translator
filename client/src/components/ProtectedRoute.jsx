import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Still checking if user is logged in — show spinner
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
      </div>
    );
  }

  // Not logged in — redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Logged in — render the protected page
  return children;
}

export default ProtectedRoute;
