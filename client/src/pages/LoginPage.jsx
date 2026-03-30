import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.js";
import { register, emailLogin, googleLogin } from "../services/authService.js";

function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Already logged in — go to home
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) return toast.error("Please fill in all fields.");
    if (isSignUp && !name) return toast.error("Please enter your name.");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    setLoading(true);
    try {
      let result;
      if (isSignUp) {
        result = await register(name, email, password);
        toast.success("Account created successfully!");
      } else {
        result = await emailLogin(email, password);
        toast.success(`Welcome back, ${result.user.name}!`);
      }
      login(result.token, result.user);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      login(result.token, result.user);
      toast.success(`Welcome, ${result.user.name}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Smart Code Translator</h1>
          <p>Translate code between programming languages using AI</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-btn ${!isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="google-btn-wrapper">
          {googleClientId ? (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed.")}
              theme="outline"
              shape="rectangular"
              size="large"
              text="continue_with"
              width="300"
            />
          ) : (
            <p>Google sign-in is unavailable until `VITE_GOOGLE_CLIENT_ID` is configured.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
