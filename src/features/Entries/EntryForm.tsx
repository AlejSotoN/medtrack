import React from "react"
import styles from './EntryForm.module.css'
import { postEntry } from "../../services/entries.client"
import { patchPatientMeta } from "../../services/patient.client"
import { useParams, useRevalidator } from "react-router-dom"
import { Patient } from "../../services/types"

interface EntryFormProps {
    patient?: Patient;
    onCancel: () => void;
    onSuccess?: () => void;
}

export default function EntryForm({ patient, onCancel, onSuccess }: EntryFormProps) {
    const { patientId } = useParams<{ patientId: string }>();
    const revalidator = useRevalidator();
    const [mainSymptoms, setMainSymptoms] = React.useState("");
    const [conditionDescription, setConditionDescription] = React.useState("");
    const [diagnosis, setDiagnosis] = React.useState("");
    const [labsAsked, setLabsAsked] = React.useState("");
    const [treatment, setTreatment] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [nextVisit, setNextVisit] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await postEntry({
                patient_id: patientId!,
                main_symptoms: mainSymptoms,
                condition_description: conditionDescription,
                diagnosis,
                labs_asked: labsAsked,
                treatment,
                notes,
                next_followup: nextVisit || undefined,
            });

            // Update last_visit (today) and next_followup on the patient record
            if (patient) {
                await patchPatientMeta(patient, {
                    lastVisit: new Date().toISOString().split('T')[0],
                    nextFollowup: nextVisit || undefined,
                });
            }

            revalidator.revalidate();
            onSuccess?.();
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred while adding the entry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>New Entry</h3>

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

                <div className={styles.field}>
                    <label className={styles.label}>Next Visit</label>
                    <input
                        className={styles.input}
                        type="date"
                        value={nextVisit}
                        onChange={(e) => setNextVisit(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Notes</label>
                    <input
                        className={styles.input}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional observations…"
                    />
                </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? "Saving…" : "Add Entry"}
                </button>
            </div>
        </form>
    );
}
