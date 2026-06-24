import React from 'react'
import styles from './EditEntry.module.css'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { PatientProfileLoaderData } from '../../services/types'
import { updateEntry } from '../../services/entries.client'

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EditEntry() {
  const navigate = useNavigate();
  const params = useParams<{ entryId: string; patientId: string }>();
  const { entries } = useLoaderData() as PatientProfileLoaderData;

  const entry = entries.find(e => String(e.entry_id) === params.entryId);

  const [mainSymptoms, setMainSymptoms] = React.useState(entry?.main_symptoms ?? '');
  const [conditionDescription, setConditionDescription] = React.useState(entry?.condition_description ?? '');
  const [labsAsked, setLabsAsked] = React.useState(entry?.labs_asked ?? '');
  const [diagnosis, setDiagnosis] = React.useState(entry?.diagnosis ?? '');
  const [treatment, setTreatment] = React.useState(entry?.treatment ?? '');
  const [notes, setNotes] = React.useState(entry?.notes ?? '');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateEntry({
        entry_id: params.entryId!,
        patient_id: params.patientId!,
        main_symptoms: mainSymptoms,
        condition_description: conditionDescription,
        labs_asked: labsAsked,
        diagnosis,
        treatment,
        notes,
      });
      navigate(-1);
    } catch {
      setError('Error saving entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <BackIcon /> Back
        </button>
        <div>
          <h1 className={styles.title}>Edit Entry</h1>
          <p className={styles.subtitle}>Update medical entry details</p>
        </div>
      </div>

      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>Main Symptoms</label>
              <input
                className={styles.input}
                value={mainSymptoms}
                onChange={(e) => setMainSymptoms(e.target.value)}
                placeholder="e.g. Headache, fever, fatigue"
                required
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>Description</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={conditionDescription}
                onChange={(e) => setConditionDescription(e.target.value)}
                placeholder="Patient has been experiencing…"
                rows={3}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Diagnosis</label>
              <input
                className={styles.input}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Influenza"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Labs Requested</label>
              <input
                className={styles.input}
                value={labsAsked}
                onChange={(e) => setLabsAsked(e.target.value)}
                placeholder="e.g. CBC, metabolic panel"
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>Treatment</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                placeholder="e.g. Ibuprofen 400mg every 8h"
                rows={2}
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label className={styles.label}>Notes</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional observations…"
                rows={2}
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
