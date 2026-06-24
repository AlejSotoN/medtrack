import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.client";
import { saveAuth } from "../../utils/auth";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Auth.module.css";
import logo from "../../assets/medtrack_logo.png";

export default function Auth() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, expiresIn, role, clinicId, doctorId } = await login(username, password);
      saveAuth(token, expiresIn);
      setUser({ id: doctorId ?? clinicId ?? "", role, clinicId, doctorId });
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoWrap}>
          <img src={logo} alt="MedTrack" className={styles.logo} />
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to your MedTrack account</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Username or Email</label>
              <input
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button className={styles.button} disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {error && <div className={styles.error}>{error}</div>}
          </form>

          <p className={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.footerLink}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
