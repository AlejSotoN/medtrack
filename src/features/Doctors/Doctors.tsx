import React from "react";
import { getDoctors, createDoctor, deleteDoctor } from "../../services/doctor.client";
import { Doctor } from "../../services/types";
import styles from "./Doctors.module.css";

export default function Doctors() {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [specialty, setSpecialty] = React.useState("");

  React.useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch(() => setError("Failed to load doctors"))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setSpecialty("");
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const doctor = await createDoctor({ firstName, lastName, email, password, specialty: specialty || undefined });
      setDoctors((prev) => [...prev, doctor]);
      setShowForm(false);
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to add doctor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this doctor? Their patients will remain but they won't be able to log in.")) return;
    try {
      await deleteDoctor(id);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to remove doctor");
    }
  };

  if (loading) return <div className={styles.page}><p className={styles.empty}>Loading…</p></div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Manage Doctors</h1>
          <p className={styles.subtitle}>{doctors.length} doctor{doctors.length !== 1 ? 's' : ''} in your clinic</p>
        </div>
        <button className={styles.addBtn} onClick={() => { setShowForm((v) => !v); setError(null); }}>
          {showForm ? "Cancel" : "+ Add Doctor"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {showForm && (
        <div className={styles.inlineForm}>
          <h3 className={styles.formTitle}>New Doctor</h3>
          <form onSubmit={handleAdd}>
            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>First Name</label>
                <input className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last Name</label>
                <input className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="doctor@email.com" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Temporary password" required />
              </div>
              <div className={`${styles.field} ${styles.fullWidth}`}>
                <label className={styles.label}>Specialty (optional)</label>
                <input className={styles.input} value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="e.g. Cardiology" />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => { setShowForm(false); resetForm(); }}>Cancel</button>
              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? "Adding…" : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {doctors.length === 0 ? (
        <p className={styles.empty}>No doctors added yet. Add one to get started.</p>
      ) : (
        <div className={styles.grid}>
          {doctors.map((doc) => {
            const initials = [doc.first_name?.[0], doc.last_name?.[0]].filter(Boolean).join('').toUpperCase();
            return (
              <div key={doc.id} className={styles.doctorCard}>
                <div className={styles.doctorAvatar}>{initials}</div>
                <p className={styles.doctorName}>{doc.first_name} {doc.last_name}</p>
                <p className={styles.doctorEmail}>{doc.email}</p>
                {doc.specialty && (
                  <span className={styles.doctorSpecialty}>{doc.specialty}</span>
                )}
                <div className={styles.cardActions}>
                  <button className={styles.removeBtn} onClick={() => handleDelete(doc.id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
