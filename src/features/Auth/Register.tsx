import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.client";
import styles from "./Auth.module.css";
import logo from "../../assets/medtrack_logo.png";

type AccountType = "clinic" | "solo";

export default function Register() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = React.useState<AccountType>("clinic");

  const [clinicName, setClinicName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (accountType === "clinic") {
        await register({ accountType: "clinic", clinicName, username, email, password });
      } else {
        await register({ accountType: "solo", firstName, lastName, email, password, specialty: specialty || undefined });
      }
      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Registration failed. Please try again.");
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Choose your account type to get started</p>

          <div className={styles.tabSwitcher}>
            <button
              type="button"
              className={`${styles.tabBtn} ${accountType === "clinic" ? styles.tabBtnActive : ""}`}
              onClick={() => setAccountType("clinic")}
            >
              Clinic
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${accountType === "solo" ? styles.tabBtnActive : ""}`}
              onClick={() => setAccountType("solo")}
            >
              Solo Doctor
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {accountType === "clinic" ? (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Clinic Name</label>
                  <input
                    className={styles.input}
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Username</label>
                  <input
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>First Name</label>
                  <input
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last Name</label>
                  <input
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Specialty (optional)</label>
                  <input
                    className={styles.input}
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                autoComplete="new-password"
                required
              />
            </div>

            <button className={styles.button} disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>

            {error && <div className={styles.error}>{error}</div>}
          </form>

          <p className={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.footerLink}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
