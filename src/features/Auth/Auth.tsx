import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.client";
import { saveAuth } from "../../utils/auth";
import styles from "./Auth.module.css";

export default function Auth() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, expiresIn } = await login(username, password);
      saveAuth(token, expiresIn);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>MedTrack</h1>
        <p className={styles.subtitle}>
          Secure access to patient records
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
            />
          </div>

          <button className={styles.button} disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </button>

          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
